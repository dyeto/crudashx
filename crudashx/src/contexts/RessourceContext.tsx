import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ResourceDataProvider } from "../types";
import { useGlobalData } from "./GlobalDataContext";

export type ResourceContextType<T = any> = {
  items: T[];
  selected?: T | null;
  loading: boolean;
  error?: any;
  refresh: () => Promise<void>;
  getOne: (id: number | string) => Promise<void>;
  create: (data: Partial<T>) => Promise<void>;
  update: (id: number | string, data: Partial<T>) => Promise<void>;
  remove: (id: number | string) => Promise<void>;
};

// Create the context
const ResourceContext = createContext<ResourceContextType | undefined>(
  undefined
);

// Provider component
export const ResourceProvider = <T,>({
  provider,
  name,
  children,
}: {
  provider?: ResourceDataProvider<T>;
  name: string
  children: ReactNode;
}) => {
  const [items, setItems] = useState<T[]>([]);
  const [selected, setSelected] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const {states, getOne: ggetOne, getAll: ggetAll, post: gpost, update: gupdate, remove: gremove } = useGlobalData();

  const refresh = async () => {
    setLoading(true);
    try {
      const data = await (provider ? provider.getAll() : ggetAll(name.toLowerCase()));
      setItems(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getOne = async (id: number | string) => {
    setLoading(true);
    try {
      const data = await (provider ? provider.getOne(id) : ggetOne(name.toLowerCase(), id));
      setSelected(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const create = async (data: Partial<T>) => {
    setLoading(true);
    try {
      const newItem = await (provider ? provider.post(data) : gpost(name.toLowerCase(), data));
      setItems((prev) => [...prev, newItem]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: number | string, data: Partial<T>) => {
    setLoading(true);
    try {
      const updatedItem = await (provider ? provider.update(id, data) : gupdate(name.toLowerCase(), id, data));
      setItems((prev) =>
        prev.map((item: any) => (item.id === id ? updatedItem : item))
      );
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: number | string) => {
    setLoading(true);
    try {
      await (provider ? provider.delete(id) : gremove(name.toLowerCase(), id));
      setItems((prev) => prev.filter((item: any) => item.id !== id));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    setItems(states[name]?.items)
    console.log("states",states);
  }, [name,states]);

  return (
    <ResourceContext.Provider
      value={{
        items,
        selected,
        loading,
        error,
        refresh,
        getOne,
        create,
        update,
        remove,
      }}
    >
      {children}
    </ResourceContext.Provider>
  );
};

// Base hook to access context
export const useResource = <T,>() => {
  const context = useContext(ResourceContext);
  if (!context) {
    throw new Error("useResource must be used within a ResourceProvider");
  }
  return context as ResourceContextType<T>;
};

// Specialized helper hooks
export const useGetAll = <T,>() => {
  const { items, loading, error, refresh } = useResource<T>();
  return { items, loading, error, refresh };
};

export const useGetOne = <T,>() => {
  const { selected, loading, error, getOne } = useResource<T>();
  return { selected, loading, error, getOne };
};

export const useCreate = <T,>() => {
  const { create, loading, error } = useResource<T>();
  return { create, loading, error };
};

export const useUpdate = <T,>() => {
  const { update, loading, error } = useResource<T>();
  return { update, loading, error };
};

export const useDelete = <T,>() => {
  const { remove, loading, error } = useResource<T>();
  return { remove, loading, error };
};
