import Swal from 'sweetalert2';
import { db } from "../firebase/firebaseConfig";
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";


// con lo de thunk, que es lo que ayuda con el middleware para las acciones asincronas
//  tiene además del dispatch, el getState, y se puede acceder a esos, y ya del
//  get state, podemos acceder a los valores del state, o con el dispatch para
//  ejecutar una acción y se modifique algo del state
export const startNewNote = () => {
    return async (dispatch, getState) => {
        const {uid} = getState().auth;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const docRef = await db.collection(`${uid}/journal/notes`).add(newNote);
        dispatch(activeNote(docRef.id, newNote));
        dispatch(addNewNote(docRef.id, newNote));
    }
}
// Action to set a note in the state
export const activeNote = (id, note) => (
    {
        type: types.notesActive,
        payload: {
            id,
            ...note
        }
    }
)

export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
})

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}
 
export const setNotes = (notes) => ({
    type: types.noteLoad,
    payload: notes
});

// action to update notes in firestore
export const startSaveNote = (note) => {
    return async (dispatch, getState) => {
        const {uid} = getState().auth;

        
        const noteToFirestore = {...note};
        delete noteToFirestore.id;

        if(!noteToFirestore.url) { delete noteToFirestore.url; }
        if(!noteToFirestore.body) { delete noteToFirestore.body; }

        await db.doc(`/${uid}/journal/notes/${note.id}`).update(noteToFirestore)
            .then(() => {
                dispatch(refreshNote(note.id, note));
                Swal.fire('Saved', note.title, 'success');
            })
            .catch(() => {
                Swal.fire('Something went wrong :(', note.title, 'error');
            })
    }
}

// action to update the note that's just been updated
//  so in the list of notes it is updated
export const refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id, 
        note: {
            id,
            ...note
        }
    }
})

// action that calls ./helpers/fileUpload to upload the image and returns
//  image url, then we call action startSaveNote so the db is updated
export const startUploadingPicture = (file) => {
    return async (dispatch, getState) => {
        const {active: activeNote} = getState().notes;
        // UI feedback
        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait.',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        }); 
        const fileUrl = await fileUpload(file);
        
        activeNote.url = fileUrl;
        dispatch(startSaveNote(activeNote));

        Swal.close();
    }
}

//
export const startDeleting = (noteId) => {
    return async (dispatch, getState) => {
        const {uid} = getState().auth;
        // deleted from firestore
        await db.doc(`${uid}/journal/notes/${noteId}`).delete();

        //now deleted from store
        dispatch(deleteNote(noteId));
    }
}

export const deleteNote = (noteId) => ({
    type: types.notesDelete,
    payload: noteId,
})

export const notesLogout = () => ({
    type: types.notesLogoutCleaning,
})
