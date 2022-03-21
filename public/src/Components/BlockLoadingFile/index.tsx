import React from "react"
import {useActions} from "../../hooks/useActions"

interface IPropsLoadingFile {
    id: string
    name: string
    progress: number
}

const BlockLoadingFile: React.FC<IPropsLoadingFile> = ({ id, name, progress }) => {

    const {deleteUploadFile} = useActions()

    return (
        <div className="block-loading-file">
            <div className="block-loading-file__up">
                <div className="block-loading-file__name">{name}</div>
                <div onClick={() => deleteUploadFile(id)} className="block-loading-file__close">X</div>
            </div>
            <div className="progress">

                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: `${progress}%` }}></div>

            </div>
        </div>
    )
}

export default BlockLoadingFile