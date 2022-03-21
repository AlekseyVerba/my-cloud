import {URL_SERVER} from "../config/"




export const httpDownloadAccessFile = async (fileID: string, fileName: string, userID: string) => {
    try {

        const request = await fetch(`${URL_SERVER}/api/file/download-access-file?fileID=${fileID}&userID=${userID}`, {
            method: "GET",
        })

        if (!request.ok) {
            return alert("Ошибка")
        }

        const file = await request.blob()
        const downloadURL = window.URL.createObjectURL(file)
        
        const linkFile = document.createElement("a")
        linkFile.href = downloadURL
        linkFile.download = fileName
        document.body.append(linkFile)
        linkFile.click()
        linkFile.remove()

    } catch(e) {

        return alert("Произошла ошибка")

    }

}