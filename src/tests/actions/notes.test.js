import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { startDeleting, startLoadingNotes, startNewNote, startSaveNote, startUploadingPicture } from '../../actions/notes';
import { db } from '../../firebase/firebaseConfig';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// jest.mock('../../helpers/fileUpload', () => ({
//     fileUpload: jest.fn( () => {
//         return 'https://hola-mundo.com/cosa.jpg';
//         // return Promise.resolve('https://hola-mundo.com/cosa.jpg');
//     })
// }))


const initState = {
    auth: {
        uid: 'TESTING',
        name: 'Raul',
        email: 'rch@rch.com'
    },
    notes: {
        active: {
            id: '57j6AUAtA3w4Yyj3G1o9',
            title: 'Hola',
            body: 'Mundo'
        }
    }
}
let store = mockStore(initState)

describe('Tests un notes actions', () => {
    beforeEach(() => {
        store = mockStore(initState)
    })
    
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
        await db.doc(`TESTING/journal/notes/${newNoteId}`).delete();
    })
    
    // // test('should delete note from db', async () => {
    // //     await store.dispatch(startDeleting(newNoteId));
    // //     const actions = store.getActions();
    // //     expect(actions[2]).toEqual({
    // //         type: types.notesDelete,
    // //         payload: newNoteId
    // //     })
    // // })
    

    // test('should startLoadingNotes work correctly', async() => {
    //     await store.dispatch(startLoadingNotes('TESTING'));
    //     const actions = store.getActions();
    //     console.log(actions);
    // })
    
    // test('startLoadingNotes should load all notes', async() => {
    //     await store.dispatch( startLoadingNotes('TESTING') );
    //     const actions = store.getActions();
    //     expect( actions[0] ).toEqual({
    //         type: types.notesLoad,
    //         payload: expect.any(Array)
    //     });

    //     const expected = {
    //         id: expect.any(String),
    //         title: expect.any(String),
    //         body: expect.any(String),
    //         date: expect.any(Number),
    //     }

    //     expect( actions[0].payload[0] ).toMatchObject( expected );
    // })

    // test('should updatenote', async() => {
    //     const note = {
    //         id: '02L6n2ZPdEgpELw8y7ML',
    //         title: 'titulo',
    //         body: 'body'
    //     };
    //     await store.dispatch( startSaveNote( note ) );
    //     const actions = store.getActions();
    
    //     expect( actions[0].type ).toBe( types.notesUpdated );
    //     const docRef = await db.doc(`/TESTING/journal/notes/${ note.id }`).get();
    //     expect( docRef.data().title ).toBe( note.title );
    // })
    
    // test('startUploading should update url entry', async() => {    
    //     const file = new File([], 'foto.jpg');
    //     await store.dispatch( startUploadingPicture( file )  );
    //     const docRef = await db.doc('/TESTING/journal/notes/02L6n2ZPdEgpELw8y7ML').get();
    //     expect( docRef.data().url ).toBe('https://hola-mundo.com/cosa.jpg');
    // })

})
