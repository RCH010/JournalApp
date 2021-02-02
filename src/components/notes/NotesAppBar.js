import React from 'react'

export const NotesAppBar = () => {
    return (
        <div className='notes__app-bar'>
            <span>28 de Febrero, 2020</span>

            <div>
                <button className='btn'>
                    Picture
                </button>
                <button className='btn'>
                    Save
                </button>
            </div>
        </div>
    )
}
