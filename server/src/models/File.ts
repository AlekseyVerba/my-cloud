import { Schema, model, Model} from "mongoose";
import {IFile} from "../types/Models/File"

const FileSchema:Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        default: 0
    },
    path: {
        type: String,
        required: true
    },
    accessLink: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: "File"
    },
    childs: [{
        type: Schema.Types.ObjectId,
        ref: "File"
    }],
    dateCreate: {
        type: Date,
        default:  Date.now()
    }
})

const File: Model<IFile> = model("File", FileSchema)

export default File
