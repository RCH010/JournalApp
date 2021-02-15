import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types";

describe('Tests in authReducer', () => {
    test('should initial state match', () => {
        expect(authReducer({},{type: 'def'})).toEqual({});
    })
    
    test('should perform login action', () => {
        const initState = {};
        const action = {
            type: types.login,
            payload: {
                uid:'123',
                displayName:'raul',
                email:'rch@rch.com'
            }
        };
        const state = authReducer(initState, action);

        expect(state).toEqual({
            uid:'123',
            name:'raul',
            email:'rch@rch.com'
        });
    })

    test('should perform logout action', () => {
        const initState = { uid:'123', displayName:'raul', email:'rch@rch.com' };
        const action = {
            type: types.logout,
        };
        const state = authReducer(initState, action);

        expect(state).toEqual({});
    })
    
})
