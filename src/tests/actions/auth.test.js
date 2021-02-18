import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { types } from '../../types/types';
import { login, logout, startLoginWithEmailPassword, startLogout } from '../../actions/auth';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};
let store = mockStore(initState);

describe('Tests in auth actions', () => {
    
    beforeEach(()=> {
        store = mockStore(initState);
    })

    test('login and logout should create action', () => {
       
        const uid = 'ABC123';
        const displayName = 'Raul';
        const email= 'rch@gmail.com'
        const loginAction = login( uid, displayName, email );
        const logoutAction = logout();

        expect( loginAction ).toEqual({
            type: types.login,
            payload: {
                uid,
                displayName,
                email
            }
        });

        expect( logoutAction ).toEqual({
            type: types.logout
        });

    })

    test('should perform startLogout', async() => {
        await store.dispatch( startLogout() );
        const actions = store.getActions();
    
        expect( actions[0] ).toEqual({
            type: types.logout
        });

        expect( actions[1] ).toEqual({
            type: types.notesLogoutCleaning
        });
    });

    test('should login with startLoginEmailPassword', async() => {
        await store.dispatch( startLoginWithEmailPassword('test@testing.com','123456') );
        const actions = store.getActions();
        expect( actions[1] ).toEqual({
            type: types.login,
            payload: {
                uid: 'nYCxZdyym3W7K97i22JxvEDT8Aq1',
                displayName: null,
                email: 'test@testing.com'
            }
        })
    })

    // register
    // podria ser con el sdk de firebase para revisarlo

})