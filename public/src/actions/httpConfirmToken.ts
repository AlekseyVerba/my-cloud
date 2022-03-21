import {URL_SERVER} from "../config/"

export const httpConfirmToken = async (token: string) => {
   try {

    const request = await fetch(`${URL_SERVER}/api/check-token/${token}`)

    if (!request.ok) {
        const data = await request.json()
        return data
    }

    const data = await request.json()

    return data

   } catch(e) {
    return {
        status: false,
        message: "Произошла ошибка"
    }
   }
}