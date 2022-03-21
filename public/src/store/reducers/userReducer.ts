import {ActionsUser, IStateUser, TypeActionUserReducer} from "../../types/reducers/user"

const defaultStateUser: IStateUser = {
    token: "",
    information: {},
    isAuth: false,
    errorLoginMessage: null,
    errorUpdateMessage: null,
    successUpdateMessage: null,
    loader_status_user: true
}

const userReducer = (state = defaultStateUser, action: ActionsUser): IStateUser => {
    switch(action.type) {

        case TypeActionUserReducer.LOGIN: {
            return {
                ...state,
                token: action.payload.token,
                information: action.payload.user,
                isAuth: true
            }
        }

        case TypeActionUserReducer.CHANGE_ERROR_LOGIN_TEXT: {
            return {
                ...state,
                errorLoginMessage: action.payload
            }
        }

        case TypeActionUserReducer.LOGOUT: {
            localStorage.removeItem("user")
            return {
                ...state,
                isAuth: false,
                token: "",
                information: {}
            }
        }

        case TypeActionUserReducer.CHANGE_AVATAR_PROFILE: {
            return {
                ...state,
                information: {...state.information, avatarImg: action.payload}
            }
        }

        case TypeActionUserReducer.UPDATE_INFO_USER: {
            return {
                ...state,
                information: action.payload
            }
        }

        case TypeActionUserReducer.ERROR_MESSAGE_UPDATE_INFO_USER: {
            return {
                ...state,
                errorUpdateMessage: action.payload
            }
        }

        case TypeActionUserReducer.SUCCESS_MESSAGE_UPDATE_INFO_USER: {
            return {
                ...state,
                successUpdateMessage: action.payload
            }
        }

        case TypeActionUserReducer.IS_LOADING: {
            return {
                ...state,
                loader_status_user: action.payload
            }
        }

        default: {
            return state
        }
    }
}

export default userReducer