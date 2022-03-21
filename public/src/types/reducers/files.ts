export enum TypesActionFiles {
    GET_FILES = "GET_FILES",
    CHANGE_DISPLAY_POPUP = "CHANGE_DISPLAY_POPUP",
    ADD_FILE = "ADD_FILE",
    REMOVE_FILE = "REMOVE_FILE",
    CHANGE_DIR = "CHANGE_DIR",
    CHANGE_FOCUS_FILE = "CHANGE_FOCUS_FILE",
    ADD_ID_IN_STACK = "ADD_ID_IN_STACK",
    REMOVE_ID_FROM_STACK = "REMOVE_ID_FROM_STACK",
    CREATE_ACCESS_LINK = "CREATE_ACCESS_LINK",
    REMOVE_ACCESS_LINK = "REMOVE_ACCESS_LINK",
    TYPE_SHOW_FILES = "TYPE_SHOW_FILES",
    LOADER_IS_SHOW = "LOADER_IS_SHOW",

    LOADER_DOWNLOAD_FILE = "LOADER_DOWNLOAD_FILE",
    LOADER_CREATE_URL_FILE = "LOADER_CREATE_URL_FILE",
    LOADER_REMOVE_FILE = "LOADER_REMOVE_FILE"
}

interface actionGetFiles {
    type: TypesActionFiles.GET_FILES
    payload: IFile[]
}


interface actionChangeDisplayPopup {
    type: TypesActionFiles.CHANGE_DISPLAY_POPUP
    payload: "block" | "none"
}

interface actionAddFile {
    type: TypesActionFiles.ADD_FILE
    payload: IFile
}

interface actionChangeDir {
    type: TypesActionFiles.CHANGE_DIR
    payload: string | null
}

interface actionChangeFocusFile {
    type: TypesActionFiles.CHANGE_FOCUS_FILE
    payload: string | null
}

interface actionAddIdInStack {
    type: TypesActionFiles.ADD_ID_IN_STACK,
    payload: string
}

interface actionRemoveIdFromStack {
    type: TypesActionFiles.REMOVE_ID_FROM_STACK,
    payload: string
}

interface actionRemoveFile {
    type: TypesActionFiles.REMOVE_FILE,
    payload: string
}

interface actionCreateAccesslink {
    type: TypesActionFiles.CREATE_ACCESS_LINK,
    payload: {
        id: string,
        accessLink: string
    }
}

interface actionChangeTypeShowFiles {
    type: TypesActionFiles.TYPE_SHOW_FILES,
    payload: "string" | "plitka"
}

interface actionRemoveAccessLink {
    type: TypesActionFiles.REMOVE_ACCESS_LINK,
    payload: string
}

interface actionChangeLoader {
    type: TypesActionFiles.LOADER_IS_SHOW,
    payload: boolean
}

interface actionChangeLoaderDownLoadFile {
    type: TypesActionFiles.LOADER_DOWNLOAD_FILE,
    payload: string | null
}

interface actionChangeLoaderCreateURLFile {
    type: TypesActionFiles.LOADER_CREATE_URL_FILE,
    payload: string | null
}

interface actionChangeLoaderRemoveFile {
    type: TypesActionFiles.LOADER_REMOVE_FILE,
    payload: string | null
}



export type ActionFiles = actionGetFiles | actionChangeDisplayPopup | actionAddFile | actionChangeDir | actionChangeFocusFile | actionAddIdInStack | actionRemoveIdFromStack | actionRemoveFile | actionCreateAccesslink | actionRemoveAccessLink | actionChangeTypeShowFiles | actionChangeLoader | actionChangeLoaderDownLoadFile | actionChangeLoaderCreateURLFile | actionChangeLoaderRemoveFile


export interface IFile {
        name: string
        type: string
        path: string
        user: string
        accessLink?: string
        parent?: string
        size?: number
        childs: string[]
        _id: string
        dateCreate: string
} 

export interface IStateFiles {
    files: IFile[]
    currentDir: string | null,
    showPopup: "block" | "none",
    focusFile: string | null,
    dirStack: string[],
    typeShow: "string" | "plitka",
    loader_status_files: boolean,

    loader_download_file: string | null,
    loader_create_url_file: string | null,
    loader_remove_file: string | null
}