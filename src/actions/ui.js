import { types } from "../types/types"

export const setError = (errorMsg) => {
    return {
        type: types.uiSetError,
        payload: errorMsg
    };
};

export const removeError = () => {
    return {
        type: types.uiRemoveError
    };
};

export const startLoading = () => {
    return {
        type: types.uiStartLoading
    }
};

export const finishLoading = () => {
    return {
        type: types.uiFinishLoading
    };
}