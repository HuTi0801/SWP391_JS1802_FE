import * as UserApi from "../../api/userRequest";

export const getDataUser = () => async (dispatch) => {
  dispatch({ type: "USER_START" }); //load api 1' true
  try {
    const response = await UserApi.getUser();
    dispatch({ type: "USER_SUCCESS", payload: response.data }); //loading: false
  } catch (error) {
    dispatch({ type: "USER_FAIL" });
  }
};

export const createUser = () => async (dispatch) => {
  dispatch({ type: "USER_START" }) //load api
  try {
    await UserApi.createUserRequest(data);
  } catch (error) {
    dispatch({ type: "USER_FAIL" }); //error
  }
}
