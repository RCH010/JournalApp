import Swal from 'sweetalert2'
import { googleAuthProvider, firebase } from "../firebase/firebaseConfig";
import { types } from "../types/types"
import { notesLogout } from './notes';
import { finishLoading, startLoading } from "./ui";

//  CUANDO ES UNA TAREA ASINCRONA, SE NECESITA RETORNAR UN CALLBACK
export const startLoginWithEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading());
        firebase.auth().signInWithEmailAndPassword(email,password)
            .then(({user}) => {
                dispatch(
                    login(user.uid, user.displayName, user.email)
                );
            })
            .catch(e => {
                Swal.fire('Something went wrong...', e.message, 'error')
            })
            .finally(() => {
                dispatch(finishLoading())
            })
    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email,password)
            .then( async({user}) => {
                await user.updateProfile({displayName: name});
                dispatch(
                    login(user.uid, user.displayName, user.email)
                )
            })
            .catch( e => {
                Swal.fire('Something went wrong...', e.message, 'error')
            })
    }
};

export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({user}) => {
                dispatch(
                    login(user.uid, user.displayName, user.email)
                )
            });
    };
};

export const login = (uid, displayName, email) => ( {
    type: types.login,
    payload: {
        uid,
        displayName,
        email
    }
});

// logout asincrono, con firebase
export const startLogout = () => {
    return async(dispatch) => {
        await firebase.auth().signOut();
        dispatch(logout());
        dispatch(notesLogout());
    }
}

export const logout = () => {
    return {
        type: types.logout
    }
}