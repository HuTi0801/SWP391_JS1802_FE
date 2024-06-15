import { Api } from "../utils/Api";
const API = Api();
export const getProduct = () => {
    return API.get("/auth/diamond-shell/get-all-diamond-shell"); //gọi api để lấy data
};

export const createDiamondShellRequest = (data) => {
    return API.post("/auth/diamond-shell/create-diamond-shell", data);
};



export const updateDiamondShell = (id, diamondShellData) => {
    return API.post(`/auth/diamond-shell/update-diamond-shell-${id}`, diamondShellData);
};