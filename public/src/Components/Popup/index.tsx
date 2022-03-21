import React, {MouseEvent} from "react"
import useInput from "../../hooks/useInput"
import { useActions } from "../../hooks/useActions"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import "./index.scss"

const Popup: React.FC = () => {

    const {showPopup, currentDir} = useTypedSelector(state => state.files)
    const {changeStylePopup, createDir} = useActions()

    const nameValueInput = useInput("", { 
        lengthMin: {value: 1, message: "Это поле должно быть заполнено"},
    })

 
    

    const handlerCreateDir = () => {
        createDir(nameValueInput.value, currentDir)
        nameValueInput.clearValue()
        changeStylePopup("none")
    }

    return (
        <div onClick={() => changeStylePopup("none")} className="popup" style={{display: showPopup}}>
            <div className="popup__content" onClick={event => event.stopPropagation()}>
                <button type="button" className="btn-close btn-close--popup" data-bs-dismiss="alert" onClick={() => changeStylePopup("none")}></button>
                <h3 className="popup__title">Название папки</h3>
                <div className="form-group">
                    <input type="text" onBlur={nameValueInput.handlerChangeBlur} value={nameValueInput.value} onChange={(event) => nameValueInput.changeHadnlerInput(event)} className={nameValueInput.isClearBlur ?  `form-control ${nameValueInput.errors !== undefined ? "is-invalid" : "is-valid" } ` : "form-control"} placeholder="Название папки" />
                    <div className="invalid-feedback">{nameValueInput.errors}</div>
                    <div className="valid-feedback">Успешно!</div>
                </div>
                <div className="popup__buttons">
                    <button type="button" className="btn btn-danger" onClick={() => changeStylePopup("none")}>Отмена</button>
                    <button type="button" onClick={handlerCreateDir} disabled={nameValueInput.errors !== undefined ? true : false} className={nameValueInput.errors !== undefined ? "btn btn-success disabled" : "btn btn-success" }>Сохранить</button>
                </div>
            </div>
        </div>
    )
}

export default Popup