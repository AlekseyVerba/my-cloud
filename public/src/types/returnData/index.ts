import {IUser} from "../../types/reducers/user"

export interface IReturnData {
    status: boolean
    message: string
}

export interface IReturnDataUpdateInfo extends IReturnData {
    userInfo: IUser
}

export interface ILoginUser {
    token: string
    user: IUser
}