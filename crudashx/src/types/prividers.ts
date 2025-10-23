export type ResourceDataProvider<T = any, IdType = number | string> = {
    getAll: () => Promise<T[]>;
    getOne: (id: IdType) => Promise<T>;
    post: (data: Partial<T>) => Promise<T>;
    update: (id: IdType, data: Partial<T>) => Promise<T>;
    delete: (id: IdType) => Promise<boolean>;
};


export type DataProvider<T = any, IdType = number | string> = {
    getAll: (resource: string) => Promise<T[]>;
    getOne: (resource: string, id: IdType) => Promise<T>;
    post: (resource: string, data: Partial<T>) => Promise<T>;
    update: (resource: string, id: IdType, data: Partial<T>) => Promise<T>;
    delete: (resource: string, id: IdType) => Promise<boolean>;
};