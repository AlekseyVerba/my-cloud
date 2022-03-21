import {combineReducers} from "redux"
import userReducer from "./userReducer"
import fileReducer from "./fileReducer"
import blockUploadFilesReducer from "./blockUploadFilesReducer"
import accessFileReducer from "./accessFileReducer"

export const rootReducer = combineReducers({
    user: userReducer,
    files: fileReducer,
    blockUploadFiles: blockUploadFilesReducer,
    accessFile: accessFileReducer
})

export type RootState = ReturnType<typeof rootReducer>