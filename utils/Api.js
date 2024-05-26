import axios from "axios"

export const Api = () => {
    return axios.create({
        baseURL: "https://664b521735bbda10987c72ad.mockapi.io"
    })
}