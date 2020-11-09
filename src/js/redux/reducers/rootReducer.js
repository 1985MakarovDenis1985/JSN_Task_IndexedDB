import {combineReducers} from "redux";
import {indexDB_reducer} from "./indexDB_reducer";

export const rootReducer = combineReducers({
    indexDB_reducer,
})