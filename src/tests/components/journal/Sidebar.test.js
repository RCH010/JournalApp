import { mount } from "enzyme"
import { Provider } from "react-redux"
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import { startLogout } from "../../../actions/auth";
import { startNewNote } from "../../../actions/notes";
import { Sidebar } from "../../../components/journal/Sidebar"

jest.mock('../../../actions/notes', () => ({
    startNewNote: jest.fn()
}))
jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: '1234ABC',
        name: 'Testing',
        email:'test@tesing.com'
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        notes: [],
        active: null
    }
};

let store = mockStore(initState)
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
            <Sidebar />
    </Provider>
)

describe('Tests in <Sidebar/>', () => {

    test('should match Sidebar with snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('should call logout when btn pressed', () => {
        wrapper.find('button').prop('onClick')();
        expect( startLogout ).toHaveBeenCalled()

    })

    test('should call startNewNote when btn pressed', () => {
        wrapper.find('.journal__new-entry').prop('onClick')();
        expect(startNewNote).toHaveBeenCalled();
    })
    
    
    
})
