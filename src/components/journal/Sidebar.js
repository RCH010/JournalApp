import React from 'react'
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {
    return (
        <aside className='journal__sidebar'>
            <div className='journal__sidebar-navbar mt-1'>
                <h3 className='journal__sidebar-user-name'>
                    <i className='far fa-moon' />
                    <span> Raúl</span>
                </h3>

                <button className='btn'>
                    Logout
                </button>
            </div>

            <div className='journal__new-entry'>
                <i className='far fa-calendar-plus fa-3x' />
                <p className='mt-1'>
                    New entry
                </p>
            </div>

            <JournalEntries />
        </aside>
    )
}
