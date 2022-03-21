import React from "react"
import { Link, useLocation } from "react-router-dom"
import { useActions } from "../../hooks/useActions"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import defaultAvatar from "../../assets/avatar.png"
import { URL_SERVER } from "../../config"
import "./index.scss"

const Nav: React.FC = () => {

    const { pathname } = useLocation()
    const { user: { isAuth, information: { name, avatarImg } } } = useTypedSelector(state => state)
    const { Logout } = useActions()

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">My cloud</Link>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto">
                        {!isAuth ?
                            <>
                                <li className="nav-item">
                                    <Link className={pathname === "/login" ? "nav-link active" : "nav-link"} to="/login">Авторизация</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={pathname === "/registration" ? "nav-link active" : "nav-link"} to="/registration">Регистрация</Link>
                                </li>
                            </>

                            :

                            <>
                                <li className="nav-item">
                                    <a href="#" className="nav-link" onClick={Logout}>Выход</a>
                                </li>
                            </>
                        }

                    </ul>

                    {
                        isAuth ?
                            <Link to="/profile" className="navbar-avatar">
                                <div style={{ textAlign: "center" }}>
                                    <img className="nav-img" src={avatarImg ? `${URL_SERVER}/${avatarImg}` : defaultAvatar} alt="avatar" />
                                    <p className="navbar-avatar__name">{name}</p>
                                </div>

                            </Link>
                            :
                            null
                    }



                </div>
            </div>
        </nav>
    )
}

export default Nav