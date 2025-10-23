
import axios from "axios"

export type CrudConfig = {
    basename: String,
    host: String,
    listPath?: String,
    getPath?: String,
    postPath?: String,
    updatePath?: String,
    deletePath?: String,
    idType?: IdType
}

export type IdType = any

export class RessourceCrud<T> {

    basename: String
    host: String
    listPath: String
    getPath: String
    postPath: String
    updatePath: String
    deletePath: String
    idType: IdType

    constructor(host: String, basename: String, config?: CrudConfig) {
        this.basename = basename;
        this.host = host

        if (config) {
            this.listPath = config.listPath ? config.listPath : basename

            this.getPath = config.getPath ? config.getPath : `${basename}/:id`

            this.postPath = config.postPath ? config.postPath : basename

            this.updatePath = config.updatePath ? config.updatePath : `${basename}/:id`

            this.deletePath = config.deletePath ? config.deletePath : `${basename}/:id`

            this.idType = config.idType ? config.idType : "Int"
        }
        else {
            this.listPath = basename

            this.getPath = `${basename}/:id`

            this.postPath = basename

            this.updatePath = `${basename}/:id`

            this.deletePath = `${basename}/:id`

            this.idType = "Int"
        }
    }

    async getAll(): Promise<T[]> {

        const response = await axios.get(`${this.host}${this.listPath}`)
        return response.data;
    }
    async getOne(id: IdType): Promise<T> {
        const url = this.replaceId(`${this.host}${this.getPath}`, id)
        const response = await axios.get(url)
        return response.data;
    }
    async post(data: Object): Promise<T> {
        const response = await axios.post(`${this.host}${this.postPath}`, data)
        return response.data;
    }
    async update(id: IdType, data: Object): Promise<T> {
        const url = this.replaceId(`${this.host}${this.updatePath}`, id)
        const response = await axios.put(url, data)
        return response.data;

    }
    async delete(id: IdType): Promise<boolean> {
        const url = this.replaceId(`${this.host}${this.deletePath}`, id)
        const response = await axios.delete(url)
        return response.data;
    }

    replaceId(url: String, id: IdType) {
        return url.replace(":id", id.toString())
    }

}



