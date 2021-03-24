import {Dispatch} from "redux";
import {api} from "../api/api";


export type DataInitStateType = typeof initialState;

const initialState = {
    data: [] as string[],
    valueInputText: '' as string,
    isRegister: false,
    filteredData: [] as string[],
    error: ''

}

export const dataReducer = (state = initialState, action: ActionsType): DataInitStateType => {
    switch (action.type) {
        case "dataReducer/SET-DATA": {
            return {
                ...state,
                data: action.data
            }
        }
        case "dataReducer/SET-FILTERED-DATA": {
            return {
                ...state,
                filteredData: action.payload.filteredData
            }
        }
        case "redux/dataReducer/SET-IS-REGISTER":
        case "redux/dataReducer/SET-ERROR":
        case "dataReducer/SET-VALUE-INPUT-TEXT": {
            return {
                ...state,
                ...action.payload
            }
        }

        default:
            return state
    }
}


export const setDataAC = (data: Array<string>) => ({
    type: 'dataReducer/SET-DATA', data
} as const)

export const setValueInputTextAC = (valueInputText: string) => ({
    type: 'dataReducer/SET-VALUE-INPUT-TEXT', payload: {valueInputText}
} as const)

export const setFilteredDataAC = (filteredData: Array<string>) => ({
    type: 'dataReducer/SET-FILTERED-DATA', payload: {filteredData}
} as const)

export const setIsRegisterAC = (isRegister: boolean) => ({
    type: 'redux/dataReducer/SET-IS-REGISTER', payload: {isRegister}
} as const)

export const setErrorAC = (error: string) => ({
    type: 'redux/dataReducer/SET-ERROR', payload: {error}
} as const)

export const getData = () => (dispatch: Dispatch) => {

    return api.getData()
        .then((res) => {
            dispatch(setDataAC(res.data.data))
        })
        .catch((e) => {
            console.log(e)
        })
}


type setDataType = ReturnType<typeof setDataAC>
type setValueInputTextType = ReturnType<typeof setValueInputTextAC>
type setFilteredDataType = ReturnType<typeof setFilteredDataAC>
type setIsRegisterType = ReturnType<typeof setIsRegisterAC>
type setErrorACType = ReturnType<typeof setErrorAC>

export type ActionsType = setDataType
    | setValueInputTextType
    | setFilteredDataType
    | setIsRegisterType
    | setErrorACType

