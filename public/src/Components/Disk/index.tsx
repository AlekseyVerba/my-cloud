import React, {ChangeEvent, useState, DragEvent} from "react"
import FileList from "../Filelist"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import "./index.scss"
import { useActions } from "../../hooks/useActions"


const Disk: React.FC = () => {

    const {changeStylePopup, removeIdFromStack, changeDir, createFile} = useActions()
    const {dirStack, currentDir} = useTypedSelector(state => state.files)

    const [isDragonDrop, setIsDragonDrop] = useState<boolean>(false)

    const returnBack = () => {
        const copyDirStack = [...dirStack]
        const lastId = copyDirStack.pop()
        if (copyDirStack.length !== 0) {
            changeDir(copyDirStack[copyDirStack.length - 1])
            if (lastId) {
                removeIdFromStack(lastId)
            }
   
        } else {
            changeDir(null)
            if (lastId) {
                removeIdFromStack(lastId)
            }
        }
    }

    const fileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files !== null) {
            const filesLoad = [...event.target.files]
            filesLoad.forEach(file => {
                createFile(file, currentDir)
            })
        }
    }

    const onDragonDropEnter = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
        setIsDragonDrop(true)
    }

    const onDragonDropLeave = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
        console.log("we here")
        setIsDragonDrop(false)
    }

    const dropHandler = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
        const filesLoad = [...event.dataTransfer.files]

        filesLoad.forEach(file => {
            createFile(file, currentDir)
        })
   
        setIsDragonDrop(false)
    }



    return (
        <div>
            <div className="header-panel">
                <div className="header-panel__left">
                    {
                        dirStack.length !== 0 ?
                        <button onClick={returnBack} type="button" className="btn btn-primary">Назад</button> :
                        null
                    }
                    
                    <button type="button" className="btn btn-primary" onClick={() => changeStylePopup("block")}>Создать папку</button>
                    <label className="btn btn-outline-primary header-panel__label-file">
                        <span>Добавить файл</span>
                        <input onChange={(event: ChangeEvent<HTMLInputElement>) => fileUpload(event)} multiple={true} type="file" style={{display: "none"}} />
                    </label>
                </div>
                <div>

                </div>
            </div>
            {
                !isDragonDrop ?
                <div onDragEnter={onDragonDropEnter} onDragOver={onDragonDropEnter} onDragLeave={onDragonDropLeave}>
                    <FileList />
                </div> 
                : 
                <div onDrop={dropHandler} className="block-dragon" onDragEnter={onDragonDropEnter} onDragLeave={onDragonDropLeave} onDragOver={onDragonDropEnter}>
                    <span>Перетащите сюда файлы</span>
                </div>
            }
          
            
        </div>
    )
}

export default Disk