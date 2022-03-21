import { useState, useEffect, ChangeEvent } from "react";
import {IvalidateOptions} from "../types/hooks/useInput"

const useInput = (defaultValue: string , validateOptions: IvalidateOptions) => {
    const [value, setValue] = useState<string>(defaultValue)
    const [isClearBlur, setIsClearBlur] = useState<boolean>(false)

    const [errors, setErrors] = useState<string | null | undefined>()

    useEffect(() => {
        setErrors(undefined)
        if (validateOptions.lengthMax) {

            if (value.length > validateOptions.lengthMax.value) {
                setErrors(validateOptions.lengthMax.message || `Max count characters: ${validateOptions.lengthMax.value}`)
            }

        }

        if (validateOptions.lengthMin) {

            if (value.length < validateOptions.lengthMin.value) {
                setErrors(validateOptions.lengthMin.message || `Min count characters: ${validateOptions.lengthMin.value}`)
            }

        }

        if (validateOptions.isAplha) {

            if (!/^(0|[1-9]\d*)$/.test(value)) {
                setErrors(validateOptions.isAplha.message || 'input must is number')
            }

        }

        if (validateOptions.isEmail) {

            let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

            if (reg.test(value) == false) {
                setErrors(validateOptions.isEmail.message || 'input must is email')
            }

        }



    }, [value])


    const changeHadnlerInput = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }


    const handlerChangeBlur = () => {
        setIsClearBlur(true)
    }

    const clearValue = () => {
        setValue("")
        setIsClearBlur(false)
    }


    return {
        value,
        changeHadnlerInput,
        errors,
        isClearBlur,
        handlerChangeBlur,
        clearValue
    }

}

export default useInput