import axios from "axios";
import { Api } from "../utils/Api";
const API = Api();

export const getUser = () => {
  return API.get("/searchDiamond");
};

export const createUserRequest = (data) => {
  return API.post("/searchDiamond", data);
}

/* goi method POST xuong sv de search */
export const createSearchRequest = (data) => {
  return API.post("/searchDiamond", data);
}

export const getProductById = (data) => {
  return API.post("/searchDiamond/id", data);
}