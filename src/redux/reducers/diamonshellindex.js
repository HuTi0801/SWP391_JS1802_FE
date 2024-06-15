import { combineReducers } from "redux";
import { diamondShellReducer } from "./diamondShellReducer";
export const reducers = combineReducers({
    diamondShellReducer: diamondShellReducer,
});