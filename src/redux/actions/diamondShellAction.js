import * as DiamondShellApi from "../../apis/diamondShellRequest";

export const getDiamondShell = () => async (dispatch) => {
    dispatch({ type: "DIAMONDSHELL_START" }); // Start loading the API
    try {
        const response = await DiamondShellApi.getDiamonShell(); // Fetch data from the API
        dispatch({ type: "DIAMONDSHELL_SUCCESS", payload: response.data }); // Dispatch success action with the data
    } catch (error) {
        dispatch({ type: "DIAMONDSHELL_FAIL" }); // Dispatch failure action
    }
};

export const createDiamondShell = (data) => async (dispatch) => {
    dispatch({ type: "DIAMONDSHELL_START" }); // Start loading the API
    try {
        await DiamondShellApi.createDiamondShellRequest(data); // Send data to the API
        dispatch({ type: "DIAMONDSHELL_SUCCESS" }); // Dispatch success action
    } catch (error) {
        dispatch({ type: "DIAMONDSHELL_FAIL" }); // Dispatch failure action
    }
};



export const updateDiamondShell = (id, diamondShellData) => async (dispatch) => {
    dispatch({ type: "DIAMONDSHELL_START" }); // Bắt đầu tải dữ liệu từ API
    try {
        await DiamondShellApi.updateDiamondShell(id, diamondShellData); // Gửi dữ liệu đến API để cập nhật
        dispatch({ type: "DIAMONDSHELL_SUCCESS" }); // Gửi action thành công
    } catch (error) {
        dispatch({ type: "DIAMONDSHELL_FAIL" }); // Gửi action thất bại
    }
};