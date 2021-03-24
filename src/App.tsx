import React, {ChangeEvent, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
    DataInitStateType,
    getData,
    setErrorAC,
    setFilteredDataAC,
    setIsRegisterAC,
    setValueInputTextAC
} from "./store/dataReducer"
import {RootStateType} from "./store/store"
import './App.css'

export const App = () => {
    const {
        valueInputText,
        data,
        isRegister,
        error,
        filteredData
    } = useSelector<RootStateType, DataInitStateType>(state => state.data)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getData())
    }, [dispatch])

    const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setValueInputTextAC(e.currentTarget.value))
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setIsRegisterAC(e.currentTarget.checked))
    }

    const onClickFilterLength = () => {
        if (Number(valueInputText)) {
            dispatch(setFilteredDataAC(data.filter(i => i.length > Number(valueInputText))))
            dispatch(setErrorAC(''))
        } else {
            dispatch(setErrorAC('Некорректные данные'))
        }
    }

    const onClickSubStringValue = () => {
        isRegister
            ? dispatch(setFilteredDataAC(data.filter(i => i.toLocaleLowerCase().includes(valueInputText.toLocaleLowerCase()))))
            : dispatch(setFilteredDataAC(data.filter(i => i.includes(valueInputText))))
    }

    return (
        <div className={'app'}>
            <div>
                Поле ввода: <input onChange={onChangeInputValue} value={valueInputText}/>
                {error}
            </div>
            <div>
                Чувсвительность к регисру:<input type={'checkbox'} onChange={onChangeHandler} checked={isRegister}/>
            </div>
            <div>
                Фильтровать по:
                <button onClick={onClickSubStringValue}> подстроке</button>
                <button onClick={onClickFilterLength}>количеству символов</button>
            </div>

            {filteredData.length > 0 ? filteredData.map((i, id) => {
                return <div key={id}>{i}</div>
            }) : 'Ничего не найдено'}

        </div>
    );
}
export default App;