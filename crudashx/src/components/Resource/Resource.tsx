import { ReactNode } from "react";
import { ResourceDataProvider, ResourceViewConfig } from "../../types";
import { ResourceProvider } from "../../contexts";
import React from "react";
import { ListItems } from "./UserList";

type ResourceProps = {
    name: string
    title?: string,
    provider?: ResourceDataProvider;
    config?: ResourceViewConfig
}

const Resource = ({ provider, name , title, config}: ResourceProps) => {
    return (
        <ResourceProvider provider={provider} name={name}>
            <div className="w-full">
                <ListItems title={title??name} config={config}/>
            </div>
        </ResourceProvider>
    )
}

export default  Resource