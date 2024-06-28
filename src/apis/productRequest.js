import { Api } from "../utils/Api";
const API = Api();
export const getDiamond = () => {
    return API.get("/auth/diamond/get-all-diamond"); // Update the API endpoint to fetch data
};

export const createProductRequest = (data) => {
    return API.post("/auth/diamond/create-diamond", data); // Update the API endpoint to send the data
};



export const updateDiamond = (id, diamondData) => {
    return API.post(`/auth/diamond/update-diamond-${id}`, diamondData);
};

