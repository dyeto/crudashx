import { RessourceCrud } from "../classes";
import { DataProvider, ResourceDataProvider } from "../types";

export const createResourceDataProvider = (baseUrl: String, resourcePath: String): ResourceDataProvider => {
    const defaultCrud = new RessourceCrud(baseUrl, resourcePath);
    return {
        getAll: () => defaultCrud.getAll(),
        getOne: (id: number | string) => defaultCrud.getOne(id),
        post: (data: Object) => defaultCrud.post(data),
        update: (id: number | string, data: Object) => defaultCrud.update(id, data),
        delete: (id: number | string) => defaultCrud.delete(id)
    };
}


export const createDataProvider = (baseUrl: String): DataProvider => {
    return {
        getAll: (resource: string) => new RessourceCrud(baseUrl, `/${resource}`).getAll(),
        getOne: (resource: string, id: number | string) => new RessourceCrud(baseUrl, `/${resource}`).getOne(id),
        post: (resource: string, data: Object) => new RessourceCrud(baseUrl, `/${resource}`).post(data),
        update: (resource: string, id: number | string, data: Object) => new RessourceCrud(baseUrl, `/${resource}`).update(id, data),
        delete: (resource: string, id: number | string) => new RessourceCrud(baseUrl, `/${resource}`).delete(id)
    };
}



