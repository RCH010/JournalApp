import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from "enzyme"
import { LoginScreen } from "../../../components/auth/LoginScreen"
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { startGoogleLogin, startLoginWithEmailPassword } from '../../../actions/auth'; 
import { act } from 'react-dom/test-utils';

jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginWithEmailPassword: jest.fn(),
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

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <LoginScreen />
        </MemoryRouter>
    </Provider>
);

describe('Tests in <LoginScreen/>', () => {

    beforeEach(()=> {
        store = mockStore(initState);
        jest.clearAllMocks();
    })

    test('should match login with Snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    })
    
    test('should dispatch startLoginScreen action with googlebtn', () => {
        wrapper.find('.google-button').prop('onClick')();
        expect(startGoogleLogin).toHaveBeenCalled();
    })

    //'test@testing.com','123456'
    test('should startLogin with args', () => {
        act(() => {
            wrapper.find('input').at(0).prop('onChange')({target: {name: 'email', value: 'test@testing.com'}})
            wrapper.find('input').at(0).prop('onChange')({target: {name: 'password', value: '123456'}})
            wrapper.find('form').prop('onSubmit')({preventDefault(){}});
            expect(startLoginWithEmailPassword).toHaveBeenCalledWith('test@testing.com','123456')
        })
    })
    
})
