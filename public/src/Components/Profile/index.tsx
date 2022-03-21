import React, { ChangeEvent } from "react"
import { useActions } from "../../hooks/useActions"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import DefaultPNG from "../../assets/avatar.png"
import useInput from "../../hooks/useInput"
import "./index.scss"
import { URL_SERVER } from "../../config"

const Profile: React.FC = () => {

    const { information: { avatarImg, email, name }, successUpdateMessage, errorUpdateMessage } = useTypedSelector(state => state.user)
    const { changeAvatar, updateInfoUser } = useActions()

    const nameInput = useInput(name ? name : "", {
        lengthMax: { value: 15, message: "Имя должно быть меньше 15 символов" },
        lengthMin: { value: 2, message: "Имя должно быть больше 2 символов" },
    })

    const mailInput = useInput(email ? email : "", {
        isEmail: { message: "Введите корректный email" }
    })

    const oldPasswordInput = useInput("", {
        lengthMax: { value: 15, message: "Пароль должен быть меньше 15 символов" },
        lengthMin: { value: 3, message: "Пароль должен быть больше 3 символов" }
    })

    const newPasswordInput = useInput("", {
        lengthMax: { value: 15, message: "Пароль должен быть меньше 15 символов" },
        lengthMin: { value: 3, message: "Пароль должен быть больше 3 символов" }
    })

    const confirmPasswordInput = useInput("", {
        lengthMax: { value: 15, message: "Пароль должен быть меньше 15 символов" },
        lengthMin: { value: 3, message: "Пароль должен быть больше 3 символов" }
    })

    const loadingAvatar = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.files)
        const loadAvatar = [...event.target.files][0]
        changeAvatar(loadAvatar)
    }

    const submitForm = () => {
        updateInfoUser(nameInput.value, oldPasswordInput.value, confirmPasswordInput.value, newPasswordInput.value)
        confirmPasswordInput.clearValue()
        newPasswordInput.clearValue()
        oldPasswordInput.clearValue()
    }

    return (
        <div className="profile">
            <div className="profile__left">
                <div className="profile__img-wrapper">
                    <img src={avatarImg ? `${URL_SERVER}/${avatarImg}` : DefaultPNG} className="profile__img" alt="avatar" />
                    <label className="profile__change-avatar">
                        <span>Изменить фото</span>
                        <input onChange={loadingAvatar} type="file" accept=".jpg,.jpeg,.png" style={{ display: "none" }} />
                    </label>
                </div>


                <div className="form-group">
                    <label className="col-form-label mt-4">Имя</label>
                    <input type="text" value={nameInput.value} onChange={nameInput.changeHadnlerInput} className={`form-control ${nameInput.errors !== undefined ? "is-invalid" : "is-valid"} `} />
                    <div className="invalid-feedback">{nameInput.errors}</div>
                </div>

                <div className="form-group">
                    <label className="col-form-label mt-4">Email</label>
                    <input disabled={true} type="text" value={mailInput.value} onChange={mailInput.changeHadnlerInput} className={`form-control ${mailInput.errors !== undefined ? "is-invalid" : "is-valid"} `} />
                    <div className="invalid-feedback">{mailInput.errors}</div>
                </div>


                <div className="form-group">
                    <label style={{ width: "100%" }} className="col-form-label mt-4">
                        <span>Введите старый пароль</span>
                        <input type="password" onBlur={oldPasswordInput.handlerChangeBlur} value={oldPasswordInput.value} onChange={(event) => oldPasswordInput.changeHadnlerInput(event)} className={oldPasswordInput.isClearBlur ? `form-control ${oldPasswordInput.errors !== undefined ? "is-invalid" : "is-valid"} ` : "form-control"} placeholder="Пароль" />
                        <div className="invalid-feedback">{oldPasswordInput.errors}</div>
                    </label>

                </div>

                <div className="form-group">
                    <label style={{ width: "100%" }} className="col-form-label mt-4">
                        <span>Введите новый пароль</span>
                        <input type="password" onBlur={newPasswordInput.handlerChangeBlur} value={newPasswordInput.value} onChange={(event) => newPasswordInput.changeHadnlerInput(event)} className={newPasswordInput.isClearBlur ? `form-control ${newPasswordInput.errors !== undefined ? "is-invalid" : "is-valid"} ` : "form-control"} placeholder="Пароль" />
                        <div className="invalid-feedback">{newPasswordInput.errors}</div>
                    </label>

                </div>

                <div className="form-group">
                    <label style={{ width: "100%" }} className="col-form-label mt-4">
                        <span>Повторите новый пароль</span>
                        <input type="password" onBlur={confirmPasswordInput.handlerChangeBlur} value={confirmPasswordInput.value} onChange={(event) => confirmPasswordInput.changeHadnlerInput(event)} className={confirmPasswordInput.isClearBlur ? `form-control ${confirmPasswordInput.errors !== undefined ? "is-invalid" : "is-valid"} ` : "form-control"} placeholder="Пароль" />
                        <div className="invalid-feedback">{confirmPasswordInput.errors}</div>
                    </label>

                </div>

                {errorUpdateMessage && errorUpdateMessage.length ?
                    <h5 className="mention mention--error">{errorUpdateMessage}</h5>
                    :
                    null
                }

                {successUpdateMessage && successUpdateMessage.length ?
                    <h5 className="mention mention--success">{successUpdateMessage}</h5> :
                    null
                }

                <div className="d-grid gap-2 profile__button-save">
                    <button className="btn btn-lg btn-primary" disabled={oldPasswordInput.errors || newPasswordInput.errors || confirmPasswordInput.errors || mailInput.errors || nameInput.errors ? true : false} onClick={submitForm} type="button">Сохранить</button>
                </div>


            </div>

            <div className="profile__right">

            </div>

        </div>
    )
}

export default Profile