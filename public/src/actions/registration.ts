import {URL_SERVER} from "../config/"



export const HTTPRegistration = async (name: string, email: string, password: string) => {
    try {
        const request = await fetch(`${URL_SERVER}/api/reg`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password, userName: name})
        })

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