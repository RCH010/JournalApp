import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import { login } from '../actions/auth';
import { startLoadingNotes } from '../actions/notes';
import { JournalScreen } from '../components/journal/JournalScreen';
import { firebase } from '../firebase/firebaseConfig';
import { AuthRouter } from './AuthRouter';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';

export const AppRouter = () => {

    //  antes de decidir si mostrar el authRouter o el JournalScreen, se 
    //      debe esperar a recibir la respuesta de firebase, para ver si esta 
    //      autenticado o no...
    //      Para esto, creare el hook de useState, para esperar..
    //          Mientras <checking> sea true, entonces esta cargando
    //          y una vez que ya tenga una respuesta, ahora sí decido
    //          qué componente se debe mostrar.

    
    const dispatch = useDispatch();

    const [checking, setCheking] = useState(true)
    const [isLoggedIn, setisLoggedIn] = useState(false)

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if(user?.uid) {
                // set user un state
                dispatch(login(user.uid, user.displayName, user.email));
                setisLoggedIn(true);
                // get notes from db and set them on state
                dispatch(startLoadingNotes(user.uid));
            } else {
                setisLoggedIn(false);
            }
            // ya obtuvimos una respuesta
            setCheking(false);
        })
    }, [dispatch, setCheking, setisLoggedIn])

    // entonces se hará un return condicional:
    if (checking) {
        return (
            // algo de loading
            <h1>Loading...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoutes 
                        component={AuthRouter}
                        isAuthenticated={isLoggedIn}
                        path='/auth'
                    />
                    <PrivateRoutes 
                        exact
                        path='/'
                        component={JournalScreen}
                        isAuthenticated={isLoggedIn}
                    />
                    <Redirect to='/auth/login' />
                </Switch>
            </div>
        </Router>
    )

}
