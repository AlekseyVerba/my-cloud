import React from "react"
import BlockLoadingFile from "../BlockLoadingFile"
import { useActions } from "../../hooks/useActions"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import "./index.scss"

const BlockLoadingFiles: React.FC = () => {

    const {files, styleBlock} = useTypedSelector(state => state.blockUploadFiles)
    const {changeStyleBlock} = useActions()
    

    return (
        <div className="block-loading-files" style={{display: styleBlock}}>
            <button type="button" onClick={() => changeStyleBlock("none")} className="btn-close btn-close__block-loading-files" data-bs-dismiss="alert"></button>
            <div>
                {
                    files.map(file => {
                        return <BlockLoadingFile key={file.id} {...file} />
                    })
                }
            </div>
        </div>
    )
}

export default BlockLoadingFiles