import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
export const reducers = combineReducers({
    productReducer: productReducer,
});