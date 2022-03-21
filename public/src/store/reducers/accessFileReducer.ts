import {ActionsAccessFile, IStateAccessFile, TypeActionAccessFile} from "../../types/reducers/accessFile"

const defaultState: IStateAccessFile = {
    file: null
}

const accessFileReducer = (state = defaultState, action: ActionsAccessFile): IStateAccessFile => {
    switch(action.type) {

        case TypeActionAccessFile.GET_ACCESS_FILE: {
            return {
                ...state,
                file: action.payload
            }
        }

        default: {
            return state
        }

    }
}

export default accessFileReducer