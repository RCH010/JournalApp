import React from 'react'
import { Provider } from 'react-redux'
import { AppRouter } from './routers/AppRouter'
import { store } from './store/store'

// se importa aqui, en el punto más alto de la aplicación el store,
//  y este se pone con el Provider, de react-redux

export const JournalApp = () => {
    return (
        <Provider store= {store}>
            <AppRouter />
        </Provider>
    )
}
