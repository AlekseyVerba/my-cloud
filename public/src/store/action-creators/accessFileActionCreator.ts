import {TypeActionAccessFile, ActionsAccessFile} from "../../types/reducers/accessFile"
import {IFile} from "../../types/reducers/files"
import {Dispatch} from "redux"
import { URL_SERVER } from "../../config"
import { IReturnData } from "../../types/returnData/index"

export const getAccessFile = (accessID: string) => {
    return async (dispatch: Dispatch<ActionsAccessFile>) => {
        
        try {

            const request = await fetch(`${URL_SERVER}/api/file/get-file-access?accessLink=${accessID}`,{
                method: "GET"
            })

            if (!request.ok) {
                const data: IReturnData = await request.json()
                return console.log(data.message)
            }

            const data: IFile = await request.json()

            dispatch({
                type: TypeActionAccessFile.GET_ACCESS_FILE,
                payload: data
            })

        } catch(e) {

            return console.log("Произошла ошибка")

        }

    }
}