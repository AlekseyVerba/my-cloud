import {IFile} from "./files"

export enum TypeActionAccessFile {
    GET_ACCESS_FILE = "GET_ACCESS_FILE"
}

interface actionGetAccessFile {
    type: TypeActionAccessFile.GET_ACCESS_FILE,
    payload: IFile | null | undefined
}

export type ActionsAccessFile = actionGetAccessFile

export interface IStateAccessFile {
    file: IFile | null | undefined
}