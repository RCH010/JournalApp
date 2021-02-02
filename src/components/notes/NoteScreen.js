import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    return (
        <div className='notes__main-content'>
            <NotesAppBar />
            <div className='notes__content'>

                <input
                    type='text'
                    name='noteTitle'
                    placeholder='Title'
                    className='notes__title-input'
                    autoComplete='off'
                />
                <textarea
                    placeholder="What's new?"
                    className='notes__textarea mt-1'
                >
                </textarea>
                <div 
                    className='notes__image'
                >
                    <img 
                        src='https://cdn.mos.cms.futurecdn.net/vChK6pTy3vN3KbYZ7UU7k3-1200-80.jpg' 
                        alt='imagen'
                    />
                </div>
            </div>
        </div>
    )
}
