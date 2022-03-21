import {Schema, model, Model} from "mongoose"
import {IUser} from "../types/Models/User"

const UserSchema:Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 15
    },
    avilableSpace: {
        type: Number,
        default: 1024**3*10
    },
    usedSpace: {
        type: Number,
        default: 0
    },
    tokenConfirm: {
        type: String
    },
    dataToLiveToken: {
        type: Date
    },
    isConfirm: {
        type: Boolean,
        default: false
    },
    avatarImg: String
})

const User: Model<IUser> = model("User", UserSchema)

export default User