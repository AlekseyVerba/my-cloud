import fs from "fs"
import path, { resolve } from "path"
import File from "../models/File"
import { IFile } from "../types/Models/File"
import {IUser} from "../types/Models/User"

class FileService {

    createDirectory = (userID: string, pathEl: string | null) => {
        try {
            let dirPath

            if (pathEl) {
                dirPath = path.join(__dirname, "..", "files", userID, pathEl)
            } else {
                dirPath = path.join(__dirname, "..", "files", userID)
            }

            console.log(dirPath)

            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath)
                return {
                    status: true,
                    message: "Успешно"
                }
            } else {
                return {
                    status: false,
                    message: "Файл уже создан"
                }
            }
        } catch (e) {
            return {
                status: false,
                message: "Произошла ошибка"
            }
        }
    }

    deleteFile = async (elements: string[], userId: string) => {
        return new Promise((resolve, reject) => {
            elements.forEach(async fileId => {
            
                const file: IFile | null = await File.findById(fileId)
                if (file) {
                    if (file.childs.length > 0) {
    
                        await this.deleteFile(file.childs, userId)
    
                        const pathFile = path.join(__dirname, "..", "files", userId, file.path)
    
                        fs.rmSync(pathFile, { recursive: true, force: true });
                        await file.delete()
                        // await file.save()
                        return resolve(true)
    
                    } else {
                        const pathFile = path.join(__dirname, "..", "files", userId, file.path)
                        // await file.delete()
                        if (!fs.existsSync(pathFile)) {
                            return false
                        }
                        // if (user) {
                        //     user.usedSpace -= file.size!
                        // }
                        if (file.size) {
                            global.fileSizes += file.size
                        }
                        
                        if (file.type === "dir") {
                            fs.rmdirSync(pathFile)
                        } else {
                            fs.unlinkSync(pathFile)
                        }
                        await file.delete()
                        // await user.save()
                        // await file.save()
                        return resolve(true)
                        
                    }
                    
                }
    
            })
        })
    }

}

export default new FileService()