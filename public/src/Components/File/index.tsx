import React, { MouseEvent } from "react"
import { IFile } from "../../types/reducers/files"
import { useActions } from "../../hooks/useActions"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import dir from "../../assets/dir.png"
import filePNG from "../../assets/filePNG.png"
import "./index.scss"
import { decreaseText } from "../../helpFunctions"
import LittleLoader from "../LittleLoader"

const File: React.FC<IFile> = ({ _id, childs, name, path, type, user, accessLink, children, parent, size, dateCreate }) => {

    const { changeDir, changeFocus, addIdInStack, deleteFile, createAccesLink, removeAccessLink, httpDownloadFile } = useActions()
    const { focusFile, typeShow, loader_download_file, loader_remove_file, loader_create_url_file } = useTypedSelector(state => state.files)


    const handlerChangeDir = () => {
        if (type === "dir") {
            changeDir(_id)
            addIdInStack(_id)
        }
    }

    const createFocus = (event: MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        changeFocus(_id)
    }



    const copyAccesLink = () => {
        const urlAccesLink = `${window.location.href}file/${accessLink}`
        navigator.clipboard.writeText(urlAccesLink)
    }


    if (typeShow === "plitka") {
        return (
            <div className={focusFile === _id ? "file file--plitka" : "file--plitka"} onDoubleClick={handlerChangeDir}>
                <div className="file__img">
                    <img src={type === "dir" ? dir : filePNG} alt="file" />
                </div>
                <div className=" file__name">{decreaseText(name)}</div>
                <div className={type !== "dir" ? "file__buttons" : "file__buttons file__buttons--many"}>
                    {
                        type !== "dir" ?
                            <>
                                <button type="button" disabled={loader_download_file === _id ? true : false} className="btn btn-success" onClick={() => httpDownloadFile(_id, name)}>
                                    <div style={{ display: "flex", margin: "0 auto" }}>
                                        <span style={{ margin: "0 auto" }}>Скачать</span>
                                        {
                                            loader_download_file === _id ?
                                                <LittleLoader />
                                                : null

                                        }
                                    </div>
                                </button>

                                {
                                    accessLink === undefined || accessLink === "" ?
                                        <button type="button" disabled={loader_create_url_file === _id ? true : false} onClick={() => createAccesLink(_id)} className="btn btn-info btn--middle">
                                            <div style={{ display: "flex" }}>
                                                <span style={{ margin: "0 auto" }}>Создать ссылку на файл</span>
                                                {
                                                    loader_create_url_file === _id ?
                                                        <LittleLoader />
                                                        : null

                                                }
                                            </div>
                                        </button>
                                        :
                                        <div className="buttons-link">

                                            <button type="button" className="btn btn-success" onClick={copyAccesLink}>Скопировать ссылку на файл</button>
                                            <button type="button" onClick={() => removeAccessLink(_id)} className="btn btn-danger">Удалить ссылку</button>
                                        </div>
                                }


                            </>
                            :
                            null
                    }

                    <button disabled={loader_remove_file === _id ? true : false} type="button" onClick={() => deleteFile(_id)} className="btn btn-danger">
                        <div style={{ display: "flex" }}>
                            <span style={{margin: "0 auto"}}>Удалить</span>
                            {
                                loader_remove_file === _id ?
                                    <LittleLoader />
                                    : null

                            }
                        </div>
                    </button>


                </div>
            </div>
        )
    }
    return (
        <div onClick={(event) => createFocus(event)} className={focusFile === _id ? "file file--active" : "file"} onDoubleClick={handlerChangeDir}>
            <div className="file__img col-1">
                <img src={type === "dir" ? dir : filePNG} alt="file" />
            </div>
            <div className="col-3 file__name">{decreaseText(name)}</div>
            <div className="col-1 file__size">{size ? size : 0}</div>
            <div className="col-2 file__date">{dateCreate.slice(0, 10)}</div>
            <div className={type !== "dir" ? "col-5 file__buttons" : "col-5 file__buttons file__buttons--many"}>
                {
                    type !== "dir" ?
                        <>
                            <button type="button" disabled={loader_download_file === _id ? true : false} className="btn btn-success" onClick={() => httpDownloadFile(_id, name)}>
                                <div style={{ display: "flex" }}>
                                    <span>Скачать</span>
                                    {
                                        loader_download_file === _id ?
                                            <LittleLoader />
                                            : null

                                    }
                                </div>

                            </button>

                            {
                                accessLink === undefined || accessLink === "" ?
                                    <button type="button" disabled={loader_create_url_file === _id ? true : false} onClick={() => createAccesLink(_id)} className="btn btn-info btn--middle">

                                        <div style={{ display: "flex" }}>
                                            <span>Создать ссылку на файл</span>
                                            {
                                                loader_create_url_file === _id ?
                                                    <LittleLoader />
                                                    : null

                                            }
                                        </div>
                                    </button>
                                    :
                                    <div className="buttons-link">

                                        <button type="button" className="btn btn-success" onClick={copyAccesLink}>Скопировать ссылку на файл</button>
                                        <button type="button" onClick={() => removeAccessLink(_id)} className="btn btn-danger">Удалить ссылку</button>
                                    </div>
                            }


                        </>
                        :
                        null
                }

                <button type="button" disabled={loader_remove_file === _id ? true : false} onClick={() => deleteFile(_id)} className="btn btn-danger">
                    <div style={{ display: "flex" }}>
                        <span>Удалить</span>
                        {
                            loader_remove_file === _id ?
                                <LittleLoader />
                                : null

                        }
                    </div>
                </button>


            </div>
        </div>
    )
}

export default File