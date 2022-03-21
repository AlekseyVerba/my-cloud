import { Dispatch } from "redux"
import { URL_SERVER } from "../../config/"
import { IReturnData } from "../../types/returnData/index"
import { TypesActionFiles, IFile, ActionFiles } from "../../types/reducers/files"
import axios from "axios"
import { addUploadFile, changeStyleBlock, changeUploadProgress } from "./blockUploadFilesActionCreator"
import { ActionBlockUploadFiles } from "../../types/reducers/blockUploadFiles"
import { IUploadFile } from "../../types/reducers/blockUploadFiles"
import { v4 as uuidv4 } from "uuid"

export const getFiles = (parent: string | null, typeFilter: string) => {
    return async (dispatch: Dispatch<ActionFiles>) => {
        try {
            dispatch({ type: TypesActionFiles.LOADER_IS_SHOW, payload: true })
            const request = await fetch(`${URL_SERVER}/api/file/get-files/?filter=${typeFilter}${parent ? "&parent=" + parent : ""}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("user")}`,
                }
            })

            if (!request.ok) {
                const data: IReturnData = await request.json()
                if (!data.status) {
                    alert(`Ошибка при получении файлов - ${data.message}`)
                }

            }

            const data = await request.json()

            return dispatch({ type: TypesActionFiles.GET_FILES, payload: data })

        } catch (e) {
            alert(`Произошла ошибка - ${e}`)
        } finally {
            dispatch({ type: TypesActionFiles.LOADER_IS_SHOW, payload: false })
        }
    }
}

export const searchFiles = (typeFilter: string, search: string) => {
    return async (dispatch: Dispatch<ActionFiles>) => {
        try {
            dispatch({ type: TypesActionFiles.LOADER_IS_SHOW, payload: true })
            const request = await fetch(`${URL_SERVER}/api/file/search-files/?filter=${typeFilter}&q=${search}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("user")}`,
                }
            })

            if (!request.ok) {
                const data: IReturnData = await request.json()
                if (!data.status) {
                    alert(`Ошибка при получении файлов - ${data.message}`)
                }

            }

            const data = await request.json()

            return dispatch({ type: TypesActionFiles.GET_FILES, payload: data })

        } catch (e) {
            alert(`Произошла ошибка - ${e}`)
        } finally {
            dispatch({ type: TypesActionFiles.LOADER_IS_SHOW, payload: false })
        }
    }
}

export const changeStylePopup = (styleDisplay: "block" | "none"): ActionFiles => {
    return {
        type: TypesActionFiles.CHANGE_DISPLAY_POPUP,
        payload: styleDisplay
    }
}

export const createDir = (name: string, parent: string | null) => {
    return async (dispatch: Dispatch<ActionFiles>) => {
        try {

            const request = await fetch(`${URL_SERVER}/api/file/create-dir`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("user")}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, parentID: parent })
            })

            if (!request.ok) {
                return alert("Произошла ошибка")
            }


            const data: IFile = await request.json()

            return dispatch({ type: TypesActionFiles.ADD_FILE, payload: data })


        } catch (e) {

            return alert("Произошла ошибка")

        }
    }
}

export const createFile = (file: any, parent: string | null) => {
    return async (dispatch: Dispatch<ActionFiles | ActionBlockUploadFiles>) => {

        try {

            const formData = new FormData()
            formData.append("file", file)

            if (parent) {
                formData.append("parentID", parent)
            }

            const newUploadFile: IUploadFile = { id: uuidv4(), name: file.name, progress: 0 }
            dispatch(addUploadFile(newUploadFile))
            dispatch(changeStyleBlock("block"))

            const request = await axios.post(`${URL_SERVER}/api/file/create-file`, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("user")}`
                },
                onUploadProgress: progressEvent => {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    dispatch(changeUploadProgress(newUploadFile.id, percentCompleted))
                }
            })

            if (request.statusText === "OK") {
                dispatch({ type: TypesActionFiles.ADD_FILE, payload: request.data })
            } else {
                // return alert("Произошла ошибка")
                return
            }

        } catch (e) {
            return
        }

    }
}

export const deleteFile = (fileID: string) => {
    return async (dispatch: Dispatch<ActionFiles>) => {
        dispatch({type: TypesActionFiles.LOADER_REMOVE_FILE,payload: fileID})
        try {

            const request = await fetch(`${URL_SERVER}/api/file/delete-file?fileID=${fileID}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("user")}`,
                }
            })

            if (!request.ok) {
                console.log("we here")
                const data = await request.json()
                return console.log(data)
            }
            console.log("aaaaa")
            const data = await request.json()
            console.log(data)


            return dispatch({
                type: TypesActionFiles.REMOVE_FILE,
                payload: fileID
            })

        } catch (e) {
            console.log("wtf")
            console.log(e)

        } finally {
            dispatch({type: TypesActionFiles.LOADER_REMOVE_FILE,payload: null})
        }

    }
}

export const changeDir = (newDir: string | null): ActionFiles => {
    return {
        type: TypesActionFiles.CHANGE_DIR,
        payload: newDir
    }
}

export const changeFocus = (file: string | null): ActionFiles => {
    return {
        type: TypesActionFiles.CHANGE_FOCUS_FILE,
        payload: file
    }
}

export const addIdInStack = (dirID: string): ActionFiles => {
    return {
        type: TypesActionFiles.ADD_ID_IN_STACK,
        payload: dirID
    }
}

export const removeIdFromStack = (dirID: string): ActionFiles => {
    return {
        type: TypesActionFiles.REMOVE_ID_FROM_STACK,
        payload: dirID
    }
}

export const createAccesLink = (fileID: string) => {
    return async (dispatch: Dispatch<ActionFiles>) => {
        dispatch({type: TypesActionFiles.LOADER_CREATE_URL_FILE,payload: fileID})
        try {

            const request = await fetch(`${URL_SERVER}/api/file/create-acceslink`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("user")}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fileID })
            })

            if (!request.ok) {
                const data: IReturnData = await request.json()
                return alert(data.message)
            }

            const data = await request.json()

            return dispatch({
                type: TypesActionFiles.CREATE_ACCESS_LINK,
                payload: {
                    id: fileID,
                    accessLink: data
                }
            })

        } catch (e) {

            alert("Произошла ошибка")

        } finally {
            dispatch({type: TypesActionFiles.LOADER_CREATE_URL_FILE,payload: null})
        }


    }
}

export const removeAccessLink = (fileID: string) => {
    return async (dispatch: Dispatch<ActionFiles>) => {
        try {
            const request = await fetch(`${URL_SERVER}/api/file/delete-accesslink?fileID=${fileID}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("user")}`,
                },
            })

            if (!request.ok) {
                const data: IReturnData = await request.json()
                return alert(data.message)
            }

            dispatch({
                type: TypesActionFiles.REMOVE_ACCESS_LINK,
                payload: fileID
            })

        } catch (e) {
            return alert("Произошла ошибка")
        }
    }
}

export const changeStyleShow = (type: "string" | "plitka"): ActionFiles => {
    return {
        type: TypesActionFiles.TYPE_SHOW_FILES,
        payload: type
    }
}

export const httpDownloadFile = (fileID: string, fileName: string) => {
    return async (dispatch: Dispatch<ActionFiles>) => {
        try {
            dispatch({type: TypesActionFiles.LOADER_DOWNLOAD_FILE, payload: fileID})
            console.log("hfhfh")
            const request = await fetch(`${URL_SERVER}/api/file/download?fileID=${fileID}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("user")}`
                }
            })

            if (!request.ok) {
                return alert("Ошибка")
            }

            const file = await request.blob()
            const downloadURL = window.URL.createObjectURL(file)

            const linkFile = document.createElement("a")
            linkFile.href = downloadURL
            linkFile.download = fileName
            document.body.append(linkFile)
            linkFile.click()
            linkFile.remove()

        } catch (e) {

            return alert("Произошла ошибка")

        } finally {
            dispatch({type: TypesActionFiles.LOADER_DOWNLOAD_FILE, payload: null})
        }
    }


}