import * as ProductApi from "../../api/productApi";

export const getDiamondShell = () => async (dispatch) => {
  dispatch({ type: "DIAMOND_SHELL_START" }); //load api 1' true
  try {
    const response = await ProductApi.getDiamondShellInfo();
    dispatch({ type: "DIAMOND_SHELL_SUCCESS", payload: response.data }); //loading: false
  } catch (error) {
    dispatch({ type: "DIAMOND_SHELL_FAIL" });
  }
};

export const getAllDiamondShell = () => async (dispatch) => {
    dispatch({ type: "DIAMOND_SHELL_START" }); //load api 1' true
    try {
      const response = await ProductApi.getAllDiamondShellInfo();
      dispatch({ type: "ALL_DIAMOND_SHELL_SUCCESS", payload: response.data }); //loading: false
    } catch (error) {
      dispatch({ type: "ALL_DIAMOND_SHELL_FAIL" });
    }
  };

export const createDiamondShellSearch = () => async (dispatch) => {
  dispatch({ type: "DIAMOND_SHELL_SEARCH_START" }) //load api
  try {
    await ProductApi.createDiamondShellSearch(data);
  } catch (error) {
    dispatch({ type: "DIAMOND_SHELL_SEARCH_FAIL" }); //error
  }
}