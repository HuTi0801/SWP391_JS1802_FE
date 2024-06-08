import axios from "axios";
import { Api } from "../utils/Api";

const API = Api();


export const getDiamondInfo = () => {
    return API.get("/diamond/get-a-diamond-${id}");
}

export const getAllDiamondInfo = () => {
    return API.get("/diamond/get-all-diamond");
}

export const getDiamondShellInfo = () => {
    return API.get("/diamond-shell/get-a-diamond-shell-${id}");
}

export const getAllDiamondShellInfo = () => {
    return API.get("/diamond-shell/get-all-diamond-shell");
}

export const  createDiamondSearch = (data) =>{
    return API.post("/diamond/searchDiamond",data)
}

export const  createDiamondShellSearch = (data) =>{
    return API.post("/diamond-shell/searchDiamondShell",data)
} 