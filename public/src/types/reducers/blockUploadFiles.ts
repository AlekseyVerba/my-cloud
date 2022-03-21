export enum TypesBlockUploadFiles {
    ADD_UPLOAD_FILE = "ADD_UPLOAD_FILE",
    DELTE_UPLOAD_FILE = "DELTE_UPLOAD_FILE",
    CHANGE_UPLOAD_PROGRESS = "CHANGE_UPLOAD_PROGRESS",
    CHANGE_STYLE_BLOCK = "CHANGE_STYLE_BLOCK",
}

export interface IUploadFile {
    id: string
    name: string
    progress: number
}

interface actionAddUploadFile {
    type: TypesBlockUploadFiles.ADD_UPLOAD_FILE
    payload: IUploadFile
}

interface actionDeleteUploadFile {
    type: TypesBlockUploadFiles.DELTE_UPLOAD_FILE
    payload: string
}

interface actionChangeUploadProgress {
    type: TypesBlockUploadFiles.CHANGE_UPLOAD_PROGRESS
    payload: {
        id: string,
        progress: number
    }
}

interface actionChangeStyleBlock {
    type: TypesBlockUploadFiles.CHANGE_STYLE_BLOCK
    payload: "none" | "block"
}

export type ActionBlockUploadFiles = actionAddUploadFile | actionDeleteUploadFile | actionChangeUploadProgress | actionChangeStyleBlock

export interface IStateBlockUploadFiles {
    files: IUploadFile[],
    styleBlock: "none" | "block"
}