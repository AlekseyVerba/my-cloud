import {ActionBlockUploadFiles, IUploadFile, TypesBlockUploadFiles} from "../../types/reducers/blockUploadFiles"

export const addUploadFile = (file: IUploadFile): ActionBlockUploadFiles => {
    return {
        type: TypesBlockUploadFiles.ADD_UPLOAD_FILE,
        payload: file
    }
}

export const deleteUploadFile = (idFile: string): ActionBlockUploadFiles => {
    return {
        type: TypesBlockUploadFiles.DELTE_UPLOAD_FILE,
        payload: idFile
    }
}

export const changeUploadProgress = (idFile: string, progressFile: number): ActionBlockUploadFiles => {
    return {
        type: TypesBlockUploadFiles.CHANGE_UPLOAD_PROGRESS,
        payload: {
            id: idFile,
            progress: progressFile
        }
    }
}

export const changeStyleBlock = (style: "block" | "none"): ActionBlockUploadFiles => {
    return {
        type: TypesBlockUploadFiles.CHANGE_STYLE_BLOCK,
        payload: style
    }
}