import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {IReturnData} from "../../types/returnData"
import {httpConfirmToken} from "../../actions/httpConfirmToken"
import Loading from "../Loading"
import {Link} from "react-router-dom"

const ConfirmToken:React.FC = () => {

    const {token} = useParams()
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [successMessage, setSuccessMessage] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        setErrorMessage("")
        setSuccessMessage("")
        setLoading(true)
        async function checkToken() {
            try {
                if (token) {
                    const data:IReturnData = await httpConfirmToken(token)
                    if (data.status) {
                        setSuccessMessage(data.message)
                    } else {
                        setErrorMessage(data.message)
                    }
                }  
            } catch(e) {
                setErrorMessage("Произошла ошибка")
            } finally {
                setLoading(false)
            }
            
        }

        checkToken()
    }, [token])

    if (loading) {
        return <Loading />
    }

    return (
        <div>
            {
                errorMessage ?
                <div style={{textAlign: "center"}}>
                    <h1 style={{textAlign:"center", color: "#ff0039"}}>{errorMessage}</h1>
                    <Link style={{marginTop: "20px"}} to="/registration" className="btn btn-primary">Перейти на форму регистрации</Link>
                </div>
                 :
                null
            }
            {
                successMessage ?
                <div style={{textAlign: "center"}}>
                    <h1 style={{textAlign:"center", color: "#3fb618"}}>{successMessage}</h1>
                    <Link style={{marginTop: "20px"}} to="/login" className="btn btn-primary">Перейти на форму авторизации</Link>
                </div> :
                null
            }
        </div>
    )
}

export default ConfirmToken