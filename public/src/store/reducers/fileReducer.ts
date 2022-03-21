import {ActionFiles, IStateFiles, TypesActionFiles} from "../../types/reducers/files"

const stateFileDefault: IStateFiles = {
    files: [],
    currentDir: null,
    showPopup: "none",
    focusFile: null, 
    dirStack: [],
    typeShow: "string",
    loader_status_files: true,
    loader_create_url_file: null,
    loader_download_file: null,
    loader_remove_file: null
}

const fileReducer = (state = stateFileDefault, action: ActionFiles): IStateFiles  => {
    switch(action.type) {

        case TypesActionFiles.GET_FILES: {
            return {
                ...state,
                files: action.payload
            }
        }

        case TypesActionFiles.CHANGE_DISPLAY_POPUP: {
            return {
                ...state,
                showPopup: action.payload
            }
        }

        case TypesActionFiles.ADD_FILE: {
            return {
                ...state,
                files: [...state.files, action.payload]
            }
        }

        case TypesActionFiles.REMOVE_FILE: {
            return {
                ...state,
                files: [...state.files.filter(file => file._id !== action.payload)]
            }
        }

        case TypesActionFiles.CHANGE_DIR: {
            return {
                ...state,
                currentDir: action.payload
            }
        }

        case TypesActionFiles.CHANGE_FOCUS_FILE: {
            return {
                ...state,
                focusFile: action.payload
            }
        }

        case TypesActionFiles.ADD_ID_IN_STACK: {
            return {
                ...state,
                dirStack: [...state.dirStack, action.payload]
            }
        }

        case TypesActionFiles.REMOVE_ID_FROM_STACK: {
            return {
                ...state,
                dirStack: [...state.dirStack.filter(el => el !== action.payload)]
            }
        }

        case TypesActionFiles.CREATE_ACCESS_LINK: {
            return {
                ...state,
                files: [...state.files.map(file => {
                    if (file._id === action.payload.id) {
                        file.accessLink = action.payload.accessLink
                    }

                    return file
                })]
            }
        }

        case TypesActionFiles.REMOVE_ACCESS_LINK: {
            return {
                ...state,
                files: [...state.files.map(file => {
                    if (file._id === action.payload) {
                        file.accessLink = undefined
                    }
                    return file
                })]
            }
        }

        case TypesActionFiles.TYPE_SHOW_FILES: {
            return {
                ...state,
                typeShow: action.payload
            }
        }

        case TypesActionFiles.LOADER_IS_SHOW: {
            return {
                ...state,
                loader_status_files: action.payload
            }
        }

        case TypesActionFiles.LOADER_DOWNLOAD_FILE: {
            return {
                ...state,
                loader_download_file: action.payload
            }
        }

        case TypesActionFiles.LOADER_CREATE_URL_FILE: {
            return {
                ...state,
                loader_create_url_file: action.payload
            }
        }

        case TypesActionFiles.LOADER_REMOVE_FILE: {
            return {
                ...state,
                loader_remove_file: action.payload
            }
        }

        default: {
            return state
        }
    }
}

export default fileReducer