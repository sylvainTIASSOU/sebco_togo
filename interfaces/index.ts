import {HTMLInputTypeAttribute} from "react";


export interface ButtonProp {
    title: string,
    type: "submit" | "button" |  "reset",
    style?: string,
    action?: any,
    disable?: boolean,
}

export interface FieldProp {
    type: HTMLInputTypeAttribute | undefined,
    name: string,
    value?: string,
    actionOnchange?: any,
    actionOnclik?: any,
    pattern?: string,
    placeholder: string,
    style?: string,
    icon?: any,
    maxLength?: number,
    minLength?: number,
}

export interface ImageProp {
    src: string,
    width: number,
    height: number,
    styles?: string,
}

export  interface DialogsProp {
    Idproduct: string,
    open: boolean,
}