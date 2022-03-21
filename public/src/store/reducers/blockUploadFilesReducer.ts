import {ActionBlockUploadFiles, IStateBlockUploadFiles, TypesBlockUploadFiles} from "../../types/reducers/blockUploadFiles"

const defaultStateBlockUploadFiles: IStateBlockUploadFiles = {
    files: [],
    styleBlock: "none"
}

const blockUploadFilesReducer = (state = defaultStateBlockUploadFiles, action: ActionBlockUploadFiles):IStateBlockUploadFiles => {
    switch(action.type) {

        case TypesBlockUploadFiles.ADD_UPLOAD_FILE: {
            return {
                ...state,
                files: [...state.files, action.payload]
            }
        }

        case TypesBlockUploadFiles.DELTE_UPLOAD_FILE: {
            return {
                ...state,
                files: [...state.files.filter(file => file.id !== action.payload)]
            }
        }

        case TypesBlockUploadFiles.CHANGE_UPLOAD_PROGRESS: {
            return {
                ...state,
                files: [...state.files.map(file => {
                    if (file.id === action.payload.id) {
                        file.progress = action.payload.progress
                    }

                    return file
                })]
            }
        }

        case TypesBlockUploadFiles.CHANGE_STYLE_BLOCK: {
            return {
                ...state,
                styleBlock: action.payload
            }
        }

        default: {
            return state
        }
    }
}

export default blockUploadFilesReducer