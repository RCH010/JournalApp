import { types } from "../types/types";


export const authReducer = (state = {}, action) => {
    // las acciones siempre se manejan con un switch
    switch (action.type) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName,
                email: action.payload.email,
            };
        case types.logout:
            return { };
        default:
            return state;
    }

}