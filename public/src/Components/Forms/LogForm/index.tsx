import React, {useState, FormEvent} from "react"
import useInput from "../../../hooks/useInput"
import { useActions } from "../../../hooks/useActions"
import {useTypedSelector} from "../../../hooks/useTypedSelector"
import "./index.scss"


const LogForm: React.FC = () => {

    const {Login} = useActions()
    const errorLoginMessage = useTypedSelector(state => state.user.errorLoginMessage)

    const mailInput = useInput("", {
        isEmail: {message: "Введите корректный email"}
    })

    const passwordInput = useInput("", {
        lengthMax: {value: 15, message: "Пароль должен быть меньше 15 символов"},
        lengthMin: {value: 3, message: "Пароль должен быть больше 3 символов"}
    })


    const onSubmitForm = async (event: FormEvent<HTMLElement>) => {
        event.preventDefault()
       
        await Login(mailInput.value, passwordInput.value)

        mailInput.clearValue()
        passwordInput.clearValue()

    }


    return (
        <form onSubmit={event => onSubmitForm(event)} className="form">
            <h1 style={{textAlign: "center"}}>Авторизация</h1>
            <div className="form-group">
                <label className="col-form-label mt-4">
                    <span>Введите свой email</span>
                    <input type="text" onBlur={mailInput.handlerChangeBlur} value={mailInput.value} onChange={(event) => mailInput.changeHadnlerInput(event)} className={mailInput.isClearBlur ?  `form-control ${mailInput.errors !== undefined ? "is-invalid" : "is-valid" } ` : "form-control"} placeholder="Email" />
                    <div className="invalid-feedback">{mailInput.errors}</div>
                    <div className="valid-feedback">Успешно!</div>
                </label>

            </div>

            <div className="form-group">
                <label className="col-form-label mt-4">
                    <span>Введите свой пароль</span>
                    <input type="password" onBlur={passwordInput.handlerChangeBlur} value={passwordInput.value} onChange={(event) => passwordInput.changeHadnlerInput(event)} className={passwordInput.isClearBlur ?  `form-control ${passwordInput.errors !== undefined ? "is-invalid" : "is-valid" } ` : "form-control"} placeholder="Пароль" />
                    <div className="invalid-feedback">{passwordInput.errors}</div>
                    <div className="valid-feedback">Успешно!</div>
                </label>

            </div>

            {errorLoginMessage ?
            <h5 className="mention mention--error">{errorLoginMessage}</h5>
            :
            null
            }

            <div className="d-grid gap-2">
                <button className= {!mailInput.errors && !passwordInput.errors ? "btn btn-lg btn-primary" :  "btn btn-lg btn-primary disabled"}  disabled={!mailInput.errors && !passwordInput.errors ? false : true} type="submit">Войти</button>
            </div>

        </form>
    )
}

// "form-control is-invalid" 

export default LogForm