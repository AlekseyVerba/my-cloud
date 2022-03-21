import {Document} from "mongoose"
import {IUser} from "./User"

export interface IFile extends Document {
    name: string
    type: string
    size?: number
    path: string
    accessLink: string
    user: IUser
    parent: IFile
    childs: string[]
}
