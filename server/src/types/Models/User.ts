import {Document} from "mongoose"

export interface IUser extends Document {
    email: string
    password: string
    name: string
    avilableSpace: number
    usedSpace: number
    tokenConfirm?: string | null
    dataToLiveToken?: string | null
    avatarImg?: string | null
    isConfirm: boolean
}
