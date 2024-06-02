export const diamondShellReducer = (
    state = { userData: [], loading: false, error: false }, //initvalue
    action
) => {
    const { type, payload } = action;
    switch (type) {
        case "DIAMOND_SHELL_START":
            return { ...state, loading: true }; //load api sửa thằng loading
        case "DIAMOND_SHELL_SUCCESS":
            localStorage.setItem("diamondshell", JSON.stringify(payload));
            return { ...state, userData: payload, loading: false };
        case "ALL_DIAMOND_SHELL_SUCCESS":
            localStorage.setItem("listdiamondshell", JSON.stringify(payload));
            return { ...state, userData: payload, loading: false };
        case "USER_FAIL":
            return { ...state, loading: false, error: true };
        default:
            return { ...state };
    }
};