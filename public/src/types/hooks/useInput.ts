export interface IvalidateOptions {
    lengthMin?: {
        value: number,
        message?: string
    },
    lengthMax?: {
        value: number,
        message?: string
    },
    isEmail?: {
        message?: string 
    },
    isString?: {
        message?:string
    },
    isAplha?: {
        message?: string
    }
}

// export interface IErrors {
//     status?: boolean,
//     errors?: string[]
// }