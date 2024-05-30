import { Api } from "../utils/Api";
const API = Api();
export const getDiamond = () => {
    return API.get("/diamond/get-all-diamond"); // Update the API endpoint to fetch data
};

export const createProductRequest = (data) => {
    return API.post("/diamond/create-diamond", data); // Update the API endpoint to send the data
};

