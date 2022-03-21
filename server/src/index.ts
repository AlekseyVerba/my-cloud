import express, {Application} from "express"
import mongoose from "mongoose"
import config from "config"
import authorizationRouter from "./routes/authorization"
import fileRouter from "./routes/files"
import cors from "cors"
import fileUpload, {} from "express-fileupload"
import path from "path"
const PORT = process.env.PORT || config.get("PORT")

const app:Application = express()

app.use(express.static(path.join(__dirname, 'static')));
app.use(cors())
app.use(express.json())
app.use(fileUpload({}))

app.use("/api", authorizationRouter)
app.use("/api/file", fileRouter)


async function start() {
    await mongoose.connect("mongodb+srv://admin:sasafa12@cluster0.9pkhb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    app.listen(PORT, () => {
        console.log(`Сервер запущен на порте ${PORT}`)
    })
}

start()