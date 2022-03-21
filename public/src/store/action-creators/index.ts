import * as UserActions from "./userActionCreator"
import * as FilesAction from "./filesActionCreator"
import * as blockUploadFilesAction from "./blockUploadFilesActionCreator"
import * as AccessFileAction from "./accessFileActionCreator"

export default {
    ...UserActions,
    ...FilesAction,
    ...blockUploadFilesAction,
    ...AccessFileAction
}