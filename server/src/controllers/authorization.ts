import { Request, Response, } from "express"
import { IAuthorization } from "../types/Controllers/Authorization"
import { validationResult } from "express-validator"
import { v4 as uuidv4 } from 'uuid';
import { hash, compare } from "bcryptjs"
import { IUser } from "../types/Models/User"
import User from "../models/User"
import File from "../models/File"
import { sendMail } from "../services/sendMail"
import config from "config"
import jwt, { Jwt } from "jsonwebtoken"
import FileService from "../services/FileService"
import {IFile} from "../types/Models/File"
import {UploadedFile} from "express-fileupload"
import path from "path";
import fs from "fs"

class Authorization  {

    async registration(req: Request, res: Response) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({status: false, message: errors})
        }
        try {
            const { email, password, userName } = req.body

            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(400).json({ status: false, message: "Пользователь с таким email уже зарегистрирован" })
            }

            const tokenHash = uuidv4()
            const passwordHash = await hash(password, 10)

            const user: IUser = new User({
                email,
                password: passwordHash,
                name: userName,
                tokenConfirm: tokenHash
            })
            await user.save()
            sendMail(email, `
            Здравствуйте, ${userName}. Для подтверждения аккаунта, перейдите по ссылке ниже. <br><br>
            <a href="${config.get("URL_PUBLIC")}/register-token/${tokenHash}">Переход</a>
            `)

            return res.status(200).json({ status: true, message: "Успешно. Вам на почту отправлено сообщение с подтверждением.Перейдите по ссылке" })

        } catch (e) {
            return res.status(500).json({ message: false, errors: "Произошла ошибка сервера" })
        }
    }

    async confimToken(req: Request, res: Response) {
        try {
            const { token } = req.params

            if (!token) {
                return res.status(400).json({ status: false, message: "Токен не найден" })
            }

            const candidate: IUser | null = await User.findOne({ tokenConfirm: token })

            if (!candidate) {
                return res.status(400).json({ status: false, message: "Пользователя с данным токеном не найдено" })
            }

            candidate.isConfirm = true
            candidate.tokenConfirm = null

            candidate.save()

            FileService.createDirectory(candidate.id, null)

            return res.status(200).json({ status: true, message: "Токен подтвержден" })

        } catch (e) {
            return res.status(500).json({ status: false, message: "Произошла ошибка сервера" })
        }
        // return res.status(200).json("hood")
    }

    async login(req: Request, res: Response) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors)
        }



        try {

            const { email, password } = req.body
            const candidateUser: IUser | null = await User.findOne({ email })

            if (!candidateUser) {
                return res.status(400).json({ status: false, message: "Пользователь не найден" })
            }

            const isPasswordApproach = await compare(password, candidateUser.password)

            if (!isPasswordApproach) {
                return res.status(400).json({ status: false, message: "Пароль не подходит" })
            }

            if (!candidateUser.isConfirm) {
                return res.status(400).json({status: false, message: "Необходимо подтвердить почту"})
            }

            const jwtToken: any = jwt.sign({ id: candidateUser.id }, config.get("SECRET_WORD_JWT"), { expiresIn: "1h" })

            return res.status(200).json({
                token: jwtToken,
                user: {
                    id: candidateUser.id,
                    email: candidateUser.email,
                    name: candidateUser.name,
                    avatarImg: candidateUser.avatarImg
                }
            })

        } catch (e) {
            return res.status(500).json({ status: false, message: "Ошибка сервера" })
        }

    }

    async isAuth(req: Request, res: Response) {
        try {
            
            const user: IUser | null = await User.findById(req.user.id)
            console.log(user)
            if (!user) {
                return res.status(400).json({status: false, message: "Не найден пользователь с данным токеном"})
            }

            const jwtToken: any = jwt.sign({ id: user.id }, config.get("SECRET_WORD_JWT"), { expiresIn: "1h" })

            console.log(jwtToken)
            return res.status(200).json({
                token: jwtToken,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    avatarImg: user.avatarImg
                }
            })

        } catch(e) {
            return res.status(500).json({status: false, message: "Произошла ошибка"})
        }
    }

    async addAvatar(req: Request, res: Response) {
        
        try {

            const avatar: UploadedFile = req.files.avatar
            const user: IUser | null = await User.findById(req.user.id)

            if (!user) {
                return res.status(400).json({status: false, message: "Пользователь не найден"})
            }
            
            if(!avatar) {
                return res.status(400).json({status: false, message: "Файл не найден"})
            }

            const typeFile = avatar.name.split(".").pop()

            if (typeFile == "jpeg" || typeFile == "jpg" || typeFile == "png") {
                if (user.avatarImg) {
                    const pathOldImg = path.join(__dirname, "..", "static", user.avatarImg)
                    fs.unlinkSync(pathOldImg)
                }

                const newName = `${uuidv4()}.${typeFile}`
                avatar.name = newName
                user.avatarImg = newName

                const pathCreate = path.join(__dirname, "..", "static", newName)

                avatar.mv(pathCreate)

                await user.save()
                return res.status(200).json(newName)
            } else {
                return res.status(400).json({status: false, message: "Тип файла должен быть jpeg, png, jpg"})
            }

        } catch(e) {

            return res.status(500).json({status: false, message: "Произошла ошибка"})

        }

    }

    async updateInfoUser(req: Request, res: Response) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({status: false, message: errors})
        }

        try {
            const {userName, oldPassword, doubleNewPassword, newPassword} = req.body

            if (newPassword !== doubleNewPassword) {
                console.log("hshs")
                return res.status(400).json({status: false, message: "Пароли не одинаковые"})
            }

            const currentUser: IUser | null = await User.findById(req.user.id)

           

            if (!currentUser) {
                return res.status(400).json({status: false, message: "Пользователь не найден"})
            }
            const comparePasswords = await compare(oldPassword, currentUser?.password)


            if (!comparePasswords) {
                return res.status(400).json({status: false, message: "Старый пароль невереный"})
            }
            
            const newPasswordHash: string = await hash(newPassword, 10)

            currentUser.name = userName
            currentUser.password = newPasswordHash
            await currentUser.save()
            return res.status(200).json({status: true, message: "Успешно", userInfo: currentUser})

        } catch (e) {

            return res.status(500).json({status: false, message: "Произошла ошибка"})

        }
        
    }

}

export default new Authorization()