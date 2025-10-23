import { RessourceCrud } from "../classes/RessourceCrud";

import { JSX } from "react";
import { DataProvider, ResourceDataProvider } from "./prividers";

function mkenum<T extends {[index: string]: U}, U extends string> (x: T) { return x; }


export const FieldType = mkenum( {
    ArrayField: "Array",
    BooleanField: "Boolean",
    DateField: "Date",
    DateTimefield: "DateTime",
    EmailField:"Email",
    PasswordField : "Password",
    IdField: "Id",
    ImageField : "Image",
    IntField : "Int",
    MoneyField: "Money",
    SelectType : "Select",
    TextField: "Text",
    TextareaField : "Texterea",
    
});

export type FieldType = (typeof FieldType)[keyof typeof FieldType]


export type SectionProps = {
    title : string,
    crud :  RessourceCrud<any>,  
    filtre: string  
}

export type DashboardProps = {
    title: string;
    dataProvider: DataProvider
    children: React.ReactElement<ResourceProps>[]; // array of <Resource />
  };
  
  export type ResourceProps = {
    name: string;
    provider: ResourceDataProvider;
  };

/**
 * [
 *  attributName,
 *  Type, 
 *  Name to show (attributName is used if not provided)
 *  show on index ?,
 *  show in form ?
 * ]
 * 
 */
export type FieldConfigType0 = [string, FieldType] | [string, FieldType, string] |[string, FieldType, string,Boolean] |[string, FieldType, string,Boolean,Boolean]

export type FieldConfigType = {
    name : string
    type : FieldType
    display? : string
    index? : Boolean
    form? : Boolean
    indexClass? : string
    formAttrs? : {
        placeholder? : string
        class? : string
        validate? : (value:string)=> Boolean
    }
}

export type FieldProps = {field : FieldConfigType,defaultValue?:string,dataSrc? : DataSourceConfigType[]}

export type DataSourceConfigType = [string, RessourceCrud<any>] | [string, RessourceCrud<any>,string]

export type DashboardMenuType = [string, RessourceCrud<any>]|[string, RessourceCrud<any>,JSX.Element]

export type PostFormProps = {
    crud : RessourceCrud<any>,  
    onFinish : () => void 

}

export type EditFormProps = {
    crud : RessourceCrud<any>,  
    onFinish : () => void ,
    initial : any

}

export type InputSelectorProps = {
    field : FieldConfigType ,
    dataSrc : DataSourceConfigType[]
    defaultValue? : string
    
}

export const ActionType = mkenum({
    show : "get",
    edit:"update",
    delete : "delete",
    divider:"divider",
    custom : "custom"

})
export type ActionType = (typeof ActionType)[keyof typeof ActionType]
export type ActionConfigType0 = [ActionType,string] | [ActionType,string,any] |[ActionType,string,any,any]

export type ActionConfigType = {
    type : ActionType
    display : string
    apply? : string
    if? : string
}
export { }