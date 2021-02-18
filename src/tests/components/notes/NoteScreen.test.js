import { mount } from "enzyme"
import thunk from "redux-thunk";
import configureStore from 'redux-mock-store';
import { NoteScreen } from "../../../components/notes/NoteScreen"
import { Provider } from "react-redux";
import { activeNote } from "../../../actions/notes";
import { act } from "react-dom/test-utils";

jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn()
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
        active: {
            id: '12344',
            body: 'Wenas',
            title: 'Ya soy titulo',
        }
    }
};

let store = mockStore(initState)
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
            <NoteScreen />
    </Provider>
)
describe('Tests in <NoteScreen/>', () => {


    test('should match NoteScreen with Snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    })
    
    test('should execute activeNote action', () => {
        act( ()=> {
            wrapper.find({name:'title'}).prop('onChange')({target: {name: 'title', value: 'I am a Title'}});
        })
        expect(activeNote).toHaveBeenLastCalledWith("12344", {"body": "Wenas", "id": "12344", "title": "I am a Title"});
    })
    
})
