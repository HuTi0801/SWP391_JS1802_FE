import axios from "axios";
import { Api } from "../utils/Api";
const API = Api();

export const createSearchRequest = (data) =>{
    return API.post("diamond/search-diamonds",data)
}