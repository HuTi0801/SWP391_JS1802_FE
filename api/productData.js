import axios from "axios";
import { Api } from "../utils/Api";
const API = api();

export const getAllProductInfo = () => {
    return API.get("");
}