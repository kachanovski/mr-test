import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleWare from "redux-thunk";
import {dataReducer} from "./dataReducer";

let reducers = combineReducers({
    data: dataReducer
});

export const store = createStore(reducers, applyMiddleware(thunkMiddleWare));

export type RootStateType = ReturnType<typeof reducers>;

// @ts-ignore
window.store = store;
