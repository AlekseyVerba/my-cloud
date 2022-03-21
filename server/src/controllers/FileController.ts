import { Request, Response } from "express"
import { IFile } from "../types/Models/File"
import { IUser } from "../types/Models/User"
import File from "../models/File"
import FileService from "../services/FileService"
import { IReturnDate } from "../types/returnData"
import { UploadedFile } from "express-fileupload"
import User from "../models/User"
import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"



class FileController {
    async newDir(req: Request, res: Response) {
        try {
            const { name, parentID } = req.body

            const parentFile: IFile | null = await File.findById(parentID)
            const newDir: IFile = new File({ name, type: "dir", path: "", user: req.user.id })

            if (parentFile) {
                let newPathDir = `${parentFile.path}\\${name}`
                newDir.path = newPathDir
                newDir.parent = parentFile.id
                parentFile.childs.push(newDir.id)
                const statusCreateDir: IReturnDate = await FileService.createDirectory(req.user.id, newPathDir)

                if (!statusCreateDir.status) {
                    return res.status(400).json(statusCreateDir)
                }
                await parentFile.save()
            } else {
                newDir.path = name
                console.log(name)
                const statusCreateDir: IReturnDate = await FileService.createDirectory(req.user.id, name)
                if (!statusCreateDir.status) {
                    return res.status(400).json(statusCreateDir)
                }
            }

            await newDir.save()

            return res.status(200).json(newDir)

        } catch (e) {
            res.status(500).json({ status: false, message: "Произошла ошибка" })
        }
    }

    async getFiles(req: Request, res: Response) {
        try {

            const { parent, filter } = req.query

            let items
            switch(filter) {

                case "date": {
                    items = await File.find({ user: req.user.id, parent }).sort({dateCreate: 1})
                    break
                }

                case "size": {
                    items = await File.find({ user: req.user.id, parent }).sort({size: -1})
                    break
                }

                case "type": {
                    items = await File.find({ user: req.user.id, parent }).sort({type: 1})
                    break
                }

                case "name": {
                    items = await File.find({ user: req.user.id, parent }).sort({name: 1})
                    break
                }

                default: {
                    items = await File.find({ user: req.user.id, parent })
                }
            }


            return res.status(200).json(items)

        } catch (e) {

            return res.status(500).json({
                status: false,
                message: "Произошла ошибка"
            })

        }
    }

    async createFile(req: Request, res: Response) {
        try {

            const file = req.files.file as UploadedFile
            console.log(req.files)

            const { parentID } = req.body

            const user: IUser | null = await User.findById(req.user.id)
            const parentFile: IFile | null = await File.findById(parentID)


            if (user && user.usedSpace + file.size < user.avilableSpace) {
                user.usedSpace += file.size
            } else {
                return res.status(400).json({ status: false, message: "Недостаточно памяти на диске" })
            }


            const typeFile = file.name.split(".").pop()

            const newFile: IFile = new File({
                name: file.name,
                type: typeFile,
                size: file.size,
                path: "",
                user: req.user.id
            })

            let pathFile = ""

            if (parentFile) {
                pathFile = path.join(__dirname, "..", "files", req.user.id, parentFile.path, file.name)
                newFile.path = `${parentFile.path}\\${file.name}`
                newFile.parent = parentFile.id

                parentFile.childs.push(newFile.id)


            } else {
                pathFile = path.join(__dirname, "..", "files", req.user.id, file.name)
                newFile.path = file.name

            }

            if (fs.existsSync(pathFile)) {
                return res.status(400).json({ status: false, message: "Файл уже создан" })
            }

            await file.mv(pathFile)

            if (parentFile !== null) {
                await parentFile.save()
            }


            await user.save()
            await newFile.save()

            return res.status(200).json(newFile)

        } catch (e) {

            return res.status(500).json({ status: false, message: "Ошибка сервера" })

        }

    }

    async downLoadFile(req: Request, res: Response) {
        try {

            const { fileID } = req.query
            const file: IFile | null = await File.findById(fileID)

            if (file) {
                const pathFile = path.join(__dirname, "..", "files", req.user.id, file.path)
                console.log(pathFile)
                return res.status(200).download(pathFile)

            } else {
                return res.status(400).json({ status: false, message: "Файл не найден" })
            }

        } catch {

            return res.status(500).json({ status: false, message: "Ошибка сервера" })

        }
    }

    async downLoadAccessFile(req: Request, res: Response) {
        try {

            let { fileID, userID } = req.query
            if (!fileID || !userID) {
                return res.status(400).json({status: false, message: "Не найдены переменные"})
            }
            const file: IFile | null = await File.findById(fileID)
            userID = userID + ""
            if (file) {
                const pathFile = path.join(__dirname, "..", "files", userID, file.path)
                console.log(pathFile)
                return res.status(200).download(pathFile)

            } else {
                return res.status(400).json({ status: false, message: "Файл не найден" })
            }

        } catch {

            return res.status(500).json({ status: false, message: "Ошибка сервера" })

        }
    }

    async deleteFile(req: Request, res: Response) {
        try {

            const { fileID } = req.query
            const file: IFile | null = await File.findById(fileID)
            const user: IUser | null = await User.findById(req.user.id)

            if (!user) return res.status(400).json({status: false, message: "Пользователь не найден"}) 

            if (file) {
                console.log(file.childs)
                if (file.childs.length > 0) {
                    global.fileSizes = 0
                    await FileService.deleteFile(file.childs, req.user.id )

                    const pathFile = path.join(__dirname, "..", "files", req.user.id, file.path)
                    user.usedSpace -= global.fileSizes
                    fs.rmSync(pathFile, { recursive: true, force: true });
                    await file.delete()
                    await user.save()
                } else {
                    const pathFile = path.join(__dirname, "..", "files", req.user.id, file.path)
                    // await file.delete()
                    if (!fs.existsSync(pathFile)) {
                        return res.status(400).json({ status: false, message: "Файл не найден по указаному пути" })
                    }

                    if (user) {
                        user.usedSpace -= file.size!
                    }

                    if (file.type === "dir") {
                        fs.rmdirSync(pathFile)
                    } else {
                        fs.unlinkSync(pathFile)
                    }

                    await file.delete()
                    await user?.save()

                    // await file.save()

                }

                return res.status(200).json({ status: true, message: "Успешно" })


            } else {
                return res.status(400).json({ status: false, message: "Файл не найден" })
            }

        } catch (e) {

            return res.status(400).json({ status: false, message: "Ошибка" })

        }
    }

    async createAccesLink(req: Request, res: Response) {
        try {

            const { fileID } = req.body
            const file: IFile | null = await File.findById(fileID)

            if (!file) {
                return res.status(400).json({ status: false, message: "Файл не найден" })
            }

            const idAccessLink = uuidv4()

            file.accessLink = idAccessLink

            file.save()

            return res.status(200).json(idAccessLink)

        } catch (e) {

            return res.status(500).json({ status: false, message: "Ошибка сервера" })

        }
    }

    async removeAccesLink(req: Request, res: Response) {
        try {

            const { fileID } = req.query
            const file: IFile | null = await File.findById(fileID)

            console.log(file)

            if (!file) {
                return res.status(400).json({ status: false, message: "Файл не найден" })
            }

            file.accessLink = ""

            await file.save()

            return res.status(200).json({ status: true })

        } catch (e) {

            return res.status(500).json({ status: false, message: "Ошибка сервера" })

        }

    }

    async getFileByAccessLink(req: Request, res: Response) {
        try {

            const { accessLink } = req.query

            const file: IFile | null = await File.findOne({
                accessLink
            })

            if (!file) {
                return res.status(400).json({ status: false, message: "Файл не найден" })
            }

            return res.status(200).json(file)

        } catch (e) {
            return res.status(500).json({ status: false, message: "Произошла ошибка" })
        }
    }

    async searchFiles(req: Request, res: Response) {
        try {

            const {q, filter} = req.query





            if (!q && !filter) {
                return res.status(400).json({status: false, message: "В запросе ничего не указано"})
            }

            let files: IFile[]
            switch(filter) {

                case "date": {
                    files = await File.find({ user: req.user.id, type: {$ne: "dir"} }).sort({dateCreate: 1})
                    break
                }

                case "size": {
                    files = await File.find({ user: req.user.id, type: {$ne: "dir"} }).sort({size: -1})
                    break
                }

                case "type": {
                    files = await File.find({ user: req.user.id, type: {$ne: "dir"} }).sort({type: 1})
                    break
                }

                case "name": {
                    files = await File.find({ user: req.user.id, type: {$ne: "dir"} }).sort({name: 1})
                    break
                }

                default: {
                    files = await File.find({ user: req.user.id, type: {$ne: "dir"} })
                }
            }


            const updateFiles = files.filter(file => {
                if (file.name.toLowerCase().includes(q+"")) {
                    return file
                }
            })

            return res.status(200).json(updateFiles)            

        } catch(e) {
            return res.status(500).json({status: false, message: "Ошибка сервера"})
        }
    }
}

export default new FileController()