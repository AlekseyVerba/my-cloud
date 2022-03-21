import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useActions } from "../../hooks/useActions"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import dir from "../../assets/dir.png"
import filePNG from "../../assets/filePNG.png"
import { decreaseText } from "../../helpFunctions"
import { httpDownloadAccessFile } from "../../actions/httpDownloadFile"

const AccessFile: React.FC = () => {

    const { fileID } = useParams()
    const { getAccessFile } = useActions()
    const { file } = useTypedSelector(state => state.accessFile)

    useEffect(() => {
        if (fileID) {
            getAccessFile(fileID)
        }
    }, [fileID])

    console.log(file)

    return (
        <>
            {
                file ?
                    <div className="file" >
                        <div className="file__img col-1">
                            <img src={file.type === "dir" ? dir : filePNG} alt="file" />
                        </div>
                        <div className="col-3 file__name">{decreaseText(file.name)}</div>
                        <div className="col-1 file__size">{file.size ? file.size : 0}</div>
                        <div className="col-2 file__date">{file.dateCreate.slice(0, 10)}</div>
                        <div className={file.type !== "dir" ? "col-5 file__buttons" : "col-5 file__buttons file__buttons--many"}>
                        <button type="button" className="btn btn-success" onClick={() => httpDownloadAccessFile(file._id, file.name, file.user)}>Скачать</button>

                        </div>
                    </div>

                    :

                    <h1>Файл не найден</h1>
            }
        </>


    )
}

export default AccessFile