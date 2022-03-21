import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"
import config from "config"



const isAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === "OPTIONS") {
        return next()
    }

    try {
        let token
        if (req.headers.authorization) {
            token = req.headers.authorization.split(" ")[1]
        }

        if (token) {
            req.user = verify(token, config.get("SECRET_WORD_JWT"))
        } else {
            return res.status(400).json("Токен не подходит")
        }

        next()

    } catch (e) {
        return res.status(400)
    }


}

export default isAuth
