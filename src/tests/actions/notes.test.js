import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { startDeleting, startNewNote } from '../../actions/notes';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const store = mockStore({
    auth: {
        uid: 'TESTING',
        name: 'Raul',
        email: 'rch@rch.com'
    }
})

describe('Tests un notes actions', () => {
    
    let newNoteId;
    // para poder hacer eesta prueba se necesita hacer una pequeña configuración
    // npm install redux-mock-store --save-dev
    test('should create a new note startNewNote action', async() => {
        await store.dispatch(startNewNote());
        const actions = store.getActions();
        const payloadData = {
            id: expect.any(String),
            title: '',
            body: '',
            date: expect.any(Number),
        };
        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: payloadData
        })
        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: payloadData
        })
        newNoteId = actions[1].payload.id;
    })
    
    test('should delete note from db', async () => {
        await store.dispatch(startDeleting(newNoteId));
        const actions = store.getActions();
        expect(actions[2]).toEqual({
            type: types.notesDelete,
            payload: newNoteId
        })
    })
    

})
