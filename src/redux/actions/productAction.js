import * as ProductApi from "../../apis/productRequest";

export const getDiamond = () => async (dispatch) => {
    dispatch({ type: "PRODUCT_START" }); //load api
    try {
        const response = await ProductApi.getDiamond(); //lấy data
        dispatch({ type: "PRODUCT_SUCCESS", payload: response.data });
    } catch (error) {
        dispatch({ type: "PRODUCT_FAIL" });
    }
};

export const createProduct = (data) => async (dispatch) => {
    dispatch({ type: "PRODUCT_START" }); //load api
    try {
        await ProductApi.createProductRequest(data);
    } catch (error) {
        dispatch({ type: "PRODUCT_FAIL" }); //error
    }
};



export const updateDiamond = (id, diamondData) => async (dispatch) => {
    dispatch({ type: "PRODUCT_START" }); // Bắt đầu tải dữ liệu từ API
    try {
        await ProductApi.updateDiamond(id, diamondData); // Gửi dữ liệu đến API để cập nhật
        dispatch({ type: "PRODUCT_SUCCESS" }); // Gửi action thành công
    } catch (error) {
        dispatch({ type: "PRODUCT_FAIL" }); // Gửi action thất bại
    }
};