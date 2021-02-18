import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import { RegisterScreen } from "../../../components/auth/RegisterScreen";
import { types } from "../../../types/types";

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

describe('Tests in <RegisterScreen/>', () => {
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <RegisterScreen />
            </MemoryRouter>
        </Provider>
    );

    beforeEach(()=> {
        store = mockStore(initState);
        jest.clearAllMocks();
    })

    test('should match with snapshot', () => {
        expect(wrapper).toMatchSnapshot();        
    })

    test('should dispatch error when fields are empty', () => {
        act(()=>{
            const wrapper = mount(
                <Provider store={store}>
                    <MemoryRouter>
                        <RegisterScreen />
                    </MemoryRouter>
                </Provider>
            );

            wrapper.find('form').prop('onSubmit')({ preventDefault(){} });
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: types.uiSetError,
                payload: 'Name is required.'
            })
        })
    })

    test('should dispatch error if email is invalid', () => {
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
        );
        
        wrapper.find({name:'name'}).simulate('change', { target: {name: 'name', value: 'Testing'} });
        wrapper.find({name:'email'}).simulate('change', { target: {name: 'email', value: 'test@testing.c'} });
        wrapper.find({name:'password'}).simulate('change', { target: {name: 'password', value: '1234567'} });
        wrapper.find({name:'password'}).simulate('change', { target: {name: 'password2', value: '1234567'} });
        
        wrapper.find('form').prop('onSubmit')({ preventDefault(){} });
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.uiSetError,
            payload: 'Email is not valid.'
        })
    })

    test('should dispatch error if passwords dont match', () => {
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
        );
        
        wrapper.find({name:'name'}).simulate('change', { target: {name: 'name', value: 'Testing'} });
        wrapper.find({name:'email'}).simulate('change', { target: {name: 'email', value: 'test@testing.com'} });
        wrapper.find({name:'password'}).simulate('change', { target: {name: 'password', value: '1234567'} });
        wrapper.find({name:'password'}).simulate('change', { target: {name: 'password2', value: '123457'} });
        
        wrapper.find('form').prop('onSubmit')({ preventDefault(){} });
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.uiSetError,
            payload: 'Password should be at least 6 characters and match with each other.'
        })
    })
    
    test('should initiate with error', () => {
        const initState = {
            auth: {},
            ui: {
                loading: false,
                msgError: 'Email is not valid.'
            },
            notes: {
                notes: [],
                active: null
            }
        };
        store = mockStore(initState);
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
        );
        expect(wrapper.find('.auth__alert-error').exists()).toBe(true);
    })

    test('should remove error when all is correct', () => {
        const initState = {
            auth: {},
            ui: {
                loading: false,
                msgError: 'Email is not valid.'
            },
            notes: {
                notes: [],
                active: null
            }
        };
        store = mockStore(initState);
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
        );
        wrapper.find({name:'name'}).simulate('change', { target: {name: 'name', value: 'Testing'} });
        wrapper.find({name:'email'}).simulate('change', { target: {name: 'email', value: 'test@testing.com'} });
        wrapper.find({name:'password'}).simulate('change', { target: {name: 'password', value: '1234567'} });
        wrapper.find({name:'password'}).simulate('change', { target: {name: 'password2', value: '1234567'} });
        
        wrapper.find('form').prop('onSubmit')({ preventDefault(){} });
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.uiRemoveError
        });
    })
})
