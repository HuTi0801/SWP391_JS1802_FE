export const productReducer = (
    state = { productData: [], loading: false, error: false }, //initvalue
    action
) => {
    const { type, payload } = action;
    switch (type) {
        case "PRODUCT_START":
            return { ...state, loading: true }; //load api sửa thằng loading
        case "PRODUCT_SUCCESS":
            return { ...state, userData: payload, loading: false };
        case "PRODUCT_FAIL":
            return { ...state, loading: false, error: true };
        default:
            return { ...state };
    }
};