import React, { useEffect, useState, ChangeEvent } from "react"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { useActions } from "../../hooks/useActions"
import File from "../File"
import "./index.scss"
import Loader from "../Loader"

const FileList: React.FC = () => {

    const { currentDir, files, typeShow, loader_status_files } = useTypedSelector(state => state.files)
    const { getFiles, changeStyleShow, searchFiles } = useActions()
    const [typeFilter, isTypeFilter] = useState<string>("date")
    const [searchValue, setSearchValue] = useState<string>("")
    const [searchTimeout, setSearchTimeout] = useState<any>(false)

    useEffect(() => {
        if (searchValue.length === 0) {
            getFiles(currentDir, typeFilter)
        } else {
            searchFiles(typeFilter, searchValue)
        }

    }, [currentDir, typeFilter])





    const changeTypeFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
        isTypeFilter(event.target.value)
    }


    const changeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)

        if (searchTimeout != false) {
            clearTimeout(searchTimeout)
        }

        if (event.target.value !== "") {

            setSearchTimeout(setTimeout(value => {
                searchFiles(typeFilter, event.target.value)
            }, 1000))

        } else {
            getFiles(currentDir, typeFilter)
        }
    }

    return (
        <div className="file-list">
            <div className="file-list__header">

                <div className="file-list__header-left">
                    <div className="form-group">

                        <input type="text" value={searchValue} onChange={changeSearchValue} className="form-control" placeholder="Поиск файлов" />
                    </div>
                </div>

                <div className="file-list__header-right">
                    <div className="form-group form-group--filter">
                        <select className="form-select" onChange={changeTypeFilter} id="exampleSelect1">
                            <option value="date">По дате</option>
                            <option value="size">По размеру</option>
                            <option value="type">По типу</option>
                            <option value="name">По названию</option>
                        </select>
                    </div>

                    <button onClick={() => changeStyleShow("plitka")} className="file-list__button file-list__button--plit">
                        <i className="svg  svg-inline-type" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 10"><path data-name="Rounded Rectangle 917 copy 3" className="cls-1" d="M1566,603h1a1,1,0,0,1,0,2h-1A1,1,0,0,1,1566,603Zm5,0h1a1,1,0,0,1,0,2h-1A1,1,0,0,1,1571,603Zm5,0h1a1,1,0,0,1,0,2h-1A1,1,0,0,1,1576,603Zm-10,4h1a1,1,0,0,1,0,2h-1A1,1,0,0,1,1566,607Zm5,0h1a1,1,0,0,1,0,2h-1A1,1,0,0,1,1571,607Zm5,0h1a1,1,0,0,1,0,2h-1A1,1,0,0,1,1576,607Zm-10,4h1a1,1,0,0,1,0,2h-1A1,1,0,0,1,1566,611Zm5,0h1a1,1,0,0,1,0,2h-1A1,1,0,0,1,1571,611Zm5,0h1a1,1,0,0,1,0,2h-1A1,1,0,0,1,1576,611Z" transform="translate(-1565 -603)"></path></svg></i>
                    </button>
                    <button onClick={() => changeStyleShow("string")} className="file-list__button file-list__button--string">
                        <i className="svg  svg-inline-type" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 10"><path data-name="Rounded Rectangle 917" className="cls-1" d="M1594,603h1a1,1,0,0,1,0,2h-1A1,1,0,0,1,1594,603Zm5,0h6a1,1,0,0,1,0,2h-6A1,1,0,0,1,1599,603Zm-5,4h1a1,1,0,0,1,0,2h-1A1,1,0,0,1,1594,607Zm5,0h6a1,1,0,0,1,0,2h-6A1,1,0,0,1,1599,607Zm-5,4h1a1,1,0,0,1,0,2h-1A1,1,0,0,1,1594,611Zm5,0h6a1,1,0,0,1,0,2h-6A1,1,0,0,1,1599,611Z" transform="translate(-1593 -603)"></path></svg></i>
                    </button>
                </div>

            </div>



            <div>
                {
                    loader_status_files === false ?
                        <div>
                            {

                                files.length === 0 ?
                                    <h2 style={{ textAlign: "center" }}>Файлов не найдено</h2>

                                    :

                                    <div>
                                        {

                                            typeShow === "plitka" ?
                                                <div className="files files--plitka">
                                                    {

                                                        files.map(file => {
                                                            return <File key={file._id} {...file} />
                                                        })


                                                    }
                                                </div>
                                                :

                                                <div>
                                                    {

                                                        files.map(file => {
                                                            return <File key={file._id} {...file} />
                                                        })


                                                    }
                                                </div>

                                        }
                                    </div>

                            }
                        </div>
                        :

                        <Loader />
                }
            </div>









        </div>
    )
}

export default FileList