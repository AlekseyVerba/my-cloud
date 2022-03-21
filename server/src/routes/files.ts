import {IRouter, Router} from "express"
import isAuth from "../middlewares/auth.middleware"
import FileController from "../controllers/FileController"

const router: IRouter = Router()

router.post("/create-dir", isAuth, FileController.newDir)
router.post("/create-file", isAuth, FileController.createFile)
router.get("/get-files", isAuth, FileController.getFiles)
router.get("/download", isAuth, FileController.downLoadFile)
router.get("/download-access-file", FileController.downLoadAccessFile)
router.delete("/delete-file", isAuth, FileController.deleteFile)
router.post("/create-acceslink", isAuth, FileController.createAccesLink)
router.delete("/delete-accesslink", isAuth, FileController.removeAccesLink)
router.get("/get-file-access", FileController.getFileByAccessLink)
router.get("/search-files", isAuth, FileController.searchFiles)

export default router