import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth)
    const handleLogout = () => {
        dispatch(startLogout());
    }

    const handleNewEntry = () => {
        console.log('do');
        dispatch(startNewNote());
    }
    return (
        <aside className='journal__sidebar'>
            <div className='journal__sidebar-navbar mt-1'>
                <h3 className='journal__sidebar-user-name'>
                    <i className='far fa-moon' />
                    <span> {user.name}</span>
                </h3>

                <button 
                    className='btn' 
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

            <div className='journal__new-entry' onClick={handleNewEntry}>
                <i className='far fa-calendar-plus fa-3x' />
                <p className='mt-1'>
                    New entry
                </p>
            </div>

            <JournalEntries />
        </aside>
    )
}
