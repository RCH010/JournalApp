import React from 'react'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploadingPicture } from '../../actions/notes'

export const NotesAppBar = () => {
    
    const dispatch = useDispatch();
    const {active} = useSelector(state => state.notes)

    const handleSave = () => {
        dispatch(startSaveNote(active));
    }

    const handlePictureUpload = () => {
        document.querySelector('#fileSelector').click(); 
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        
        if(file) {
            dispatch(startUploadingPicture(file));
        }
    }

    return (
        <div className='notes__app-bar'>
            <span>{moment().format('LL')}</span>
            <input 
                id='fileSelector'
                type='file'
                style={{display: 'none'}}
                onChange={handleFileChange}
            />
            <div>
                <button  
                    className='btn'
                    onClick={handlePictureUpload}
                >
                    Add Picture
                </button>
                <button 
                    className='btn'
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </div>
    )
}
