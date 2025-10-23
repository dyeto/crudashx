import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { DataProvider } from "../types";

type ResourceState<T = any> = {
  items: T[];
  selected?: T | null;
  loading: boolean;
  error?: any;
};

type GlobalDataContextType = {
  getAll: <T = any>(resource: string) => Promise<T[]>;
  getOne: <T = any>(resource: string, id: string | number) => Promise<T>;
  post: <T = any>(resource: string, data: Partial<T>) => Promise<T>;
  update: <T = any>(resource: string, id: string | number, data: Partial<T>) => Promise<T>;
  remove: (resource: string, id: string | number) => Promise<void>;

  // optional convenience getters
  states: Record<string, ResourceState>;
  refresh: (resource: string) => Promise<void>;
};

// contexts/GlobalDataContext.tsx
export const GlobalDataContext = createContext<GlobalDataContextType | undefined>(undefined);

export const GlobalDataProvider = ({
  provider,
  children,
}: {
  provider: DataProvider;
  children: ReactNode;
}) => {
  const [states, setStates] = useState<Record<string, ResourceState>>({});

  const setState = (resource: string, patch: Partial<ResourceState>) => {
    setStates((prev) => ({
      ...prev,
      [resource]: { ...prev[resource], ...patch },
    }));
  };

  const refresh = async <T,>(resource: string) => {
    setState(resource, { loading: true });
    try {
      const items = await provider.getAll(resource);
      setState(resource, { items, loading: false, error: null });
    } catch (err) {
      setState(resource, { error: err, loading: false });
    }
  };

  const getAll = async <T,>(resource: string): Promise<T[]> => {
    await refresh<T>(resource);
    return states[resource]?.items as T[];
  };

  const getOne = async <T,>(resource: string, id: string | number): Promise<T> => {
    setState(resource, { loading: true });
    try {
      const data = await provider.getOne(resource, id);
      setState(resource, { selected: data, loading: false });
      return data;
    } catch (err) {
      setState(resource, { error: err, loading: false });
      throw err;
    }
  };

  const post = async <T,>(resource: string, data: Partial<T>): Promise<T> => {
    setState(resource, { loading: true });
    try {
      const newItem = await provider.post(resource, data);
      setState(resource, {
        loading: false,
        items: [...(states[resource]?.items ?? []), newItem],
      });
      return newItem;
    } catch (err) {
      setState(resource, { error: err, loading: false });
      throw err;
    }
  };

  const update = async <T,>(
    resource: string,
    id: string | number,
    data: Partial<T>
  ): Promise<T> => {
    setState(resource, { loading: true });
    try {
      const updated = await provider.update(resource, id, data);
      setState(resource, {
        loading: false,
        items: (states[resource]?.items ?? []).map((i: any) =>
          i.id === id ? updated : i
        ),
      });
      return updated;
    } catch (err) {
      setState(resource, { error: err, loading: false });
      throw err;
    }
  };

  const remove = async (resource: string, id: string | number): Promise<void> => {
    setState(resource, { loading: true });
    try {
      await provider.delete(resource, id);
      setState(resource, {
        loading: false,
        items: (states[resource]?.items ?? []).filter((i: any) => i.id !== id),
      });
    } catch (err) {
      setState(resource, { error: err, loading: false });
      throw err;
    }
  };

  return (
    <GlobalDataContext.Provider
      value={{
        getAll,
        getOne,
        post,
        update,
        remove,
        refresh,
        states,
      }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
};


export const useGlobalData = () => {
  const ctx = useContext(GlobalDataContext);
  if (!ctx) throw new Error("useGlobalData must be used inside GlobalDataProvider");
  return ctx;
};

// specific resource-level helpers
export const useResourceData = <T=any,>(resource: string) => {
  const { states, refresh, getAll,getOne, post, update, remove } = useGlobalData();
  const state = states[resource] ?? { items: [], loading: false, error: null };
  return {
    ...state,
    refresh: () => refresh(resource),
    create: (data: Partial<T>) => post<T>(resource, data),
    update: (id: string | number, data: Partial<T>) => update<T>(resource, id, data),
    remove: (id: string | number) => remove(resource, id),
    getOne: (id: string | number) => getOne<T>(resource,id),
    getAll: () => getAll<T>(resource),
  };
};
