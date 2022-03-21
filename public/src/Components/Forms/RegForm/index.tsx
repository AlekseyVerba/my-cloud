import React, {FormEvent, useState} from "react"
import useInput from "../../../hooks/useInput"
import {HTTPRegistration} from "../../../actions/registration"
import "./index.scss"
import {IReturnData} from "../../../types/returnData/index"

const RegForm: React.FC = () => {
    const nameInput = useInput("", { 
        lengthMax: { value: 15, message: "Имя должно быть меньше 15 символов" },
        lengthMin: {value: 2, message: "Имя должно быть больше 2 символов"},
    })

    const mailInput = useInput("", {
        isEmail: {message: "Введите корректный email"}
    })

    const passwordInput = useInput("", {
        lengthMax: {value: 15, message: "Пароль должен быть меньше 15 символов"},
        lengthMin: {value: 3, message: "Пароль должен быть больше 3 символов"}
    })


    const [errors, setErrors] = useState<string>("")
    const [success, setSuccess] = useState<string>("")


    const onSubmitForm = async (event: FormEvent<HTMLElement>) => {
        event.preventDefault()
        const httpRequest:IReturnData = await HTTPRegistration(nameInput.value, mailInput.value, passwordInput.value)

        if (httpRequest.status) {
            setSuccess(httpRequest.message)
            setTimeout(() => {
                setSuccess("")
            }, 2500)
        } else {
            setErrors(httpRequest.message)
            setTimeout(() => {
                setErrors("")
            }, 2500)
        }

        nameInput.clearValue()
        mailInput.clearValue()
        passwordInput.clearValue()

    }

    return (
        <form onSubmit={event => onSubmitForm(event)} className="form">
            <h1 style={{textAlign: "center"}}>Регистрация</h1>
            <div className="form-group">
                <label className="col-form-label mt-4">
                    <span>Введите своё имя</span>
                    <input type="text" onBlur={nameInput.handlerChangeBlur} value={nameInput.value} onChange={(event) => nameInput.changeHadnlerInput(event)} className={nameInput.isClearBlur ?  `form-control ${nameInput.errors !== undefined ? "is-invalid" : "is-valid" } ` : "form-control"} placeholder="Имя" />
                    <div className="invalid-feedback">{nameInput.errors}</div>
                    <div className="valid-feedback">Успешно!</div>
                </label>

            </div>

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

            {errors.length ?
            <h5 className="mention mention--error">{errors}</h5>
            :
            null
            }
            
            {success.length ?
                <h5 className="mention mention--success">{success}</h5> :
                null
            }

            

            <div className="d-grid gap-2">
                <button className= {!nameInput.errors && !mailInput.errors && !passwordInput.errors ? "btn btn-lg btn-primary" :  "btn btn-lg btn-primary disabled"}  disabled={!nameInput.errors && !mailInput.errors && !passwordInput.errors ? false : true} type="submit">Зарегистрироваться</button>
            </div>

        </form>
    )
} 

export default RegForm