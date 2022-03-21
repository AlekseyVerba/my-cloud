import {Router, IRouter} from "express"
import Authorization from "../controllers/authorization"
import { body } from 'express-validator';
import isAuth from "../middlewares/auth.middleware"

const router: IRouter = Router()

router.post("/reg", 
    body("email").isEmail().withMessage("Некорректный email"),
    body("password").isLength({min: 3}).withMessage("Пароль должен быть больше 3 символов").isLength({max: 15}).withMessage("Пароль должен быть меньше 15 символов"),
    body("userName").isString().isLength({min: 2}).withMessage("Имя должно быть больше 2 символов").isLength({max: 15}).withMessage("Имя должно быть меньше 15 символов"),
    Authorization.registration
)

router.get("/check-token/:token", Authorization.confimToken)

router.post("/log", 
body("email").isEmail().withMessage("Некорректный email"),
body("password").isLength({min: 3}).withMessage("Пароль должен быть больше 3 символов").isLength({max: 15}).withMessage("Пароль должен быть меньше 15 символов"),
Authorization.login)

router.post("/update-profile", 
body("userName").isString().isLength({min: 2}).withMessage("Имя должно быть больше 2 символов").isLength({max: 15}).withMessage("Имя должно быть меньше 15 символов"),
body("oldPassword").isLength({min: 3}).withMessage("Старый пароль должен быть больше 3 символов").isLength({max: 15}).withMessage("Пароль должен быть меньше 15 символов"),
body("doubleNewPassword").isLength({min: 3}).withMessage("Новый повторяющий пароль должен быть больше 3 символов").isLength({max: 15}).withMessage("Пароль должен быть меньше 15 символов"),
body("newPassword").isLength({min: 3}).withMessage("Новый пароль должен быть больше 3 символов").isLength({max: 15}).withMessage("Пароль должен быть меньше 15 символов"),
isAuth,
Authorization.updateInfoUser
)

router.get("/is-auth",isAuth, Authorization.isAuth)
router.post("/add-avatar", isAuth, Authorization.addAvatar)

export default router