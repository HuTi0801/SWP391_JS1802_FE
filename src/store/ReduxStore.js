import {
    legacy_createStore as createStore,
    compose,
    applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { reducers } from "../redux/reducers";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

/**
 * reducers: reducer xử lý cập nhật lại state
 * initValue: gia tri khoi tao
 * enhancers: middleware redux- thunk
 * */
export default store;