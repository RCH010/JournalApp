import { mount } from "enzyme"
import thunk from "redux-thunk";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { JournalEntry } from "../../../components/journal/JournalEntry";
import { activeNote } from "../../../actions/notes";


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
const note = {
    title: 'Soy un gran titulo',
    body: 'Caus here I am... the one that u loved...',
    id: '12344AA',
    url: 'http://justalink.com/pic.png'
}
let store = mockStore(initState)
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <JournalEntry {...note}/>
    </Provider>
)

describe('Tests in <JournalEntry/>', () => {
    
    test('should match with snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    })
    
    test('should activate the note', () => {
        wrapper.find('.journal__entry').prop('onClick')();
        expect(store.dispatch).toHaveBeenCalledWith(
            activeNote(note.id, {...note})
        );
    })
    
})
