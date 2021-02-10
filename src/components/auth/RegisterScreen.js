import React from 'react'
import { Link } from "react-router-dom";
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import validator from 'validator';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch()
    const {msgError} = useSelector( state => state.ui);

    const [formValues, handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        if(isFormValid()) {
            dispatch(startRegisterWithEmailPasswordName(email,password,name));
        } 
    }

    const isFormValid = () => {
        if(name.trim().length === 0){
            dispatch(setError('Name is required.'));
            return false;
        }
        if (!validator.isEmail(email)){
            dispatch(setError('Email is not valid.'));
            return false;
        }
        if (password !== password2 || password.length <= 5){
            dispatch(setError('Password should be at least 6 characters and match with each other.'));
            return false;
        }
        dispatch(removeError());
        return true;
    }

    

    return (
        <div>
            <h3 className='auth__title'>Register</h3>

            <form onSubmit={handleRegister} className='animate__animated animate__fadeIn animate__faster'>
                {
                    msgError && 
                    (<div className='auth__alert-error'>
                        {msgError}
                    </div>)
                }
                <input 
                    type='text'
                    placeholder='Name'
                    name='name'
                    className='auth__input'
                    autoComplete='off'
                    value={name}
                    onChange={handleInputChange}
                />
                <input 
                    type='email'
                    placeholder='myjournal@gmail.com'
                    name='email'
                    className='auth__input'
                    autoComplete='off'
                    value={email}
                    onChange={handleInputChange}
                />
                <input 
                    type='password'
                    placeholder='Password'
                    name='password'
                    className='auth__input'
                    value={password}
                    onChange={handleInputChange}
                />
                <input 
                    type='password'
                    placeholder='Confirm Password'
                    name='password2'
                    className='auth__input'
                    value={password2}
                    onChange={handleInputChange}
                />

                <button
                    type='submit'
                    className='btn btn-primary btn-block mb-1 mt-1'
                >
                    Register
                </button>
                
                <Link 
                    to='/auth/login'
                    className='link'
                >
                    Already registered?
                </Link>
            </form>
        </div>
    )
}
