import {ILoginUser} from "../../types/returnData/index"

export enum TypeActionUserReducer {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    CHANGE_ERROR_LOGIN_TEXT = "CHANGE_ERROR_LOGIN_TEXT",
    CHANGE_AVATAR_PROFILE = "CHANGE_AVATAR_PROFILE",
    UPDATE_INFO_USER = "UPDATE_INFO_USER",
    ERROR_MESSAGE_UPDATE_INFO_USER = "ERROR_MESSAGE_UPDATE_INFO_USER",
    SUCCESS_MESSAGE_UPDATE_INFO_USER = "SUCCESS_MESSAGE_UPDATE_INFO_USER",
    IS_LOADING = "IS_LOADING"
}


interface actionLogin {
    type: TypeActionUserReducer.LOGIN,
    payload: ILoginUser
}

interface actionLogout {
    type: TypeActionUserReducer.LOGOUT,
}

interface actionChangeErrorLoginText {
    type: TypeActionUserReducer.CHANGE_ERROR_LOGIN_TEXT,
    payload: string | null
}

interface actionChangeAvatarProfile {
    type: TypeActionUserReducer.CHANGE_AVATAR_PROFILE,
    payload: string
}

interface actionUpdateInfoUser {
    type: TypeActionUserReducer.UPDATE_INFO_USER,
    payload: IUser
}

interface actionChangeSuccessMessageUpdateUser {
    type: TypeActionUserReducer.SUCCESS_MESSAGE_UPDATE_INFO_USER
    payload: string | undefined | null
}

interface actionChangeErrorMessageUpdateUser {
    type: TypeActionUserReducer.ERROR_MESSAGE_UPDATE_INFO_USER
    payload: string | undefined | null
}
interface actionChangeIsLoadingUser {
    type: TypeActionUserReducer.IS_LOADING
    payload: boolean
}

export type ActionsUser = actionLogin | actionLogout | actionChangeErrorLoginText | actionChangeAvatarProfile | actionUpdateInfoUser | actionChangeSuccessMessageUpdateUser | actionChangeErrorMessageUpdateUser | actionChangeIsLoadingUser


export interface IUser {
    id?: string,
    email?: string,
    name?: string,
    avatarImg?: string
}

export interface IStateUser {
    token: string,
    information: IUser
    isAuth: boolean
    errorLoginMessage: string | null
    errorUpdateMessage: string | null | undefined
    successUpdateMessage: string | null | undefined
    loader_status_user: boolean
}