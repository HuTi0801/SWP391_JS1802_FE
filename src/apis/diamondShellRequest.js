import { Api } from "../utils/Api";
const API = Api();
export const getProduct = () => {
    return API.get("/diamond-shell/get-all-diamond-shell"); //gọi api để lấy data
};

export const createDiamondShellRequest = (data) => {
    return API.post("/diamond-shell/create-diamond-shell", data);
};