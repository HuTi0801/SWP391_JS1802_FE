export const userReducer = (
  state = { userData: [], loading: false, error: false }, //initvalue
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case "USER_START":
      return { ...state, loading: true }; //load api sửa thằng loading
    case "USER_SUCCESS":
      localStorage.setItem("users", JSON.stringify(payload));
      return { ...state, userData: payload, loading: false };
    case "USER_DELETE_SUCCESS":
      //payload: 2
      const newUsers = state.userData.filter((user) => user.userId !== payload); //lay1 lay3 4 5
      return { ...state, userData: newUsers, loading: false };
    case "USER_FAIL":
      return { ...state, loading: false, error: true };
    default:
      return { ...state };
  }
};