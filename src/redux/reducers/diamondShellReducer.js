export const diamondShellReducer = (
    state = { diamondShellData: [], loading: false, error: false },

    action
) => {
    const { type, payload } = action;
    switch (type) {
        case "DIAMONDSHELL_START":
            return { ...state, loading: true };
        case "DIAMONDSHELL_SUCCESS":
            return { ...state, diamondShellData: payload, loading: false };
        case "DIAMONDSHELL_UPDATE_SUCCESS":
            // Handle the update success action here if needed
            return { ...state, loading: false };
        case "DIAMONDSHELL_FAIL":
            return { ...state, loading: false, error: true };
        default:
            return { ...state };

    }
};