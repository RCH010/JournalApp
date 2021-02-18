import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from "enzyme"
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { login } from '../../actions/auth';
import { AppRouter } from '../../routers/AppRouter';
import { act } from 'react-dom/test-utils';
import { firebase } from '../../firebase/firebaseConfig';

jest.mock('../../actions/auth', () => ({
    login: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        notes: [],
        active: null
    }
};
let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Tests in <AppRouter/>', () => {

    test('should call login if it is authenticated', async() => {
        let user;

        await act( async ()=> {
            const userCred = await firebase.auth().signInWithEmailAndPassword('test@testing.com', '123456');
            user = userCred.user;

            const wrapper = mount(
                <Provider store={store}>
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            );
        })
        expect(login).toHaveBeenCalledWith(user.uid, user.displayName, user.email)     
    })
    
})
