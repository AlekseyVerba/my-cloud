import { Dispatch } from "redux"
import { ActionsUser, TypeActionUserReducer } from "../../types/reducers/user"
import { URL_SERVER } from "../../config/"
import { IReturnData, ILoginUser, IReturnDataUpdateInfo } from "../../types/returnData/index"


export const Login = (email: string, password: string) => {
    return async (dispatch: Dispatch<ActionsUser>) => {
        try {

            const request = await fetch(`${URL_SERVER}/api/log`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            if (!request.ok) {
                const data: IReturnData = await request.json()
                console.log(data)
                dispatch({ type: TypeActionUserReducer.CHANGE_ERROR_LOGIN_TEXT, payload: data.message })
                setTimeout(() => {
                    dispatch({ type: TypeActionUserReducer.CHANGE_ERROR_LOGIN_TEXT, payload: null })
                }, 3000)
                return
            }

            const data: ILoginUser = await request.json()



            dispatch({ type: TypeActionUserReducer.LOGIN, payload: data })

            localStorage.setItem("user", data.token)

            return
        } catch (e) {
            dispatch({ type: TypeActionUserReducer.CHANGE_ERROR_LOGIN_TEXT, payload: "Произошла ошибка" })
            setTimeout(() => {
                dispatch({ type: TypeActionUserReducer.CHANGE_ERROR_LOGIN_TEXT, payload: null })
            }, 3000)
            return
        }

    }
}

export const checkAuth = () => {
    return async (dispatch: Dispatch<ActionsUser>) => {
        try {
            dispatch({type: TypeActionUserReducer.IS_LOADING, payload: true})
            if (localStorage.getItem("user")) {

                const request = await fetch(`${URL_SERVER}/api/is-auth`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("user")}`,
                    }
                })

                console.log(request)
                if (!request.ok) {
                    localStorage.removeItem("user")
                    return
                }

                const data: ILoginUser = await request.json()

                dispatch({ type: TypeActionUserReducer.LOGIN, payload: data })
                localStorage.setItem("user", data.token)

            }


        } catch (e) {
            localStorage.removeItem("user")
            return
        } finally {
            dispatch({type: TypeActionUserReducer.IS_LOADING, payload: false})
        }
    }
}

export const Logout = (): ActionsUser => {
    return {
        type: TypeActionUserReducer.LOGOUT
    }
}

export const changeAvatar = (fileAvatar: Blob) => {
    return async (dispatch: Dispatch<ActionsUser>) => {
        try {

            const formData = new FormData()
            formData.append("avatar", fileAvatar)

            const request = await fetch(`${URL_SERVER}/api/add-avatar`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("user")}`,
                },
                body: formData
            })

            if (!request.ok) {
                const data: IReturnData = await request.json()
                return alert(data.message)
            }

            const data = await request.json()

            return dispatch({type: TypeActionUserReducer.CHANGE_AVATAR_PROFILE, payload: data})

        } catch (e) {

            return alert("Произошла ошибка")

        }
    }
}

export const updateInfoUser = (userName: string, oldPassword: string, doubleNewPassword: string, newPassword: string) => {
    try {

        return async (dispatch: Dispatch<ActionsUser>) => {
            
            const request = await fetch(`${URL_SERVER}/api/update-profile`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("user")}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName,
                    oldPassword,
                    doubleNewPassword,
                    newPassword
                })
            })

            if (!request.ok) {
                const data: IReturnData = await request.json()
                console.log(data)
                if (!data.status) {
                    dispatch({type: TypeActionUserReducer.ERROR_MESSAGE_UPDATE_INFO_USER, payload: data.message})
                    setTimeout(() => {
                        dispatch({type: TypeActionUserReducer.ERROR_MESSAGE_UPDATE_INFO_USER, payload: null})
                    }, 3000)
                   
                    
                } 
                return 
            }

            const data: IReturnDataUpdateInfo = await request.json()

            dispatch({type: TypeActionUserReducer.UPDATE_INFO_USER, payload: data.userInfo})
            dispatch({type: TypeActionUserReducer.SUCCESS_MESSAGE_UPDATE_INFO_USER, payload: data.message})
            setTimeout(() => {
                dispatch({type: TypeActionUserReducer.SUCCESS_MESSAGE_UPDATE_INFO_USER, payload: null})
            }, 3000)
            return
        }

    } catch(e) {

        alert("Произошла ошибка")

    }
}