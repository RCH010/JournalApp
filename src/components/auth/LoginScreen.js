import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import validator from 'validator'
import { startGoogleLogin, startLoginWithEmailPassword } from '../../actions/auth'
import { removeError, setError } from '../../actions/ui'
import { useForm } from '../../hooks/useForm'

export const LoginScreen = () => {
    
    const dispatch = useDispatch()
    const {msgError, loading} = useSelector(state => state.ui);

    const [formValues, handleInputChange] = useForm({
        email: '',
        password: '',
    })

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        if(isFormValid()){
            dispatch(startLoginWithEmailPassword(email, password));
        }

    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    }

    const isFormValid = () => {
        if(!validator.isEmail(email)) {
            dispatch(setError('Email is invalid.'));
            return false;
        }
        if(password.length <= 5) {
            dispatch(setError('Password should be at least 6 characters.'));
            return false;
        }
        dispatch(removeError());
        return true;
    }

    return (
        <div>
            <h3 className='auth__title'>Login</h3>

            <form onSubmit={handleLogin}>
                {
                    msgError && 
                    (<div className='auth__alert-error'>
                        {msgError}
                    </div>)
                }
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

                <button
                    type='submit'
                    className='btn btn-primary btn-block'
                    disabled={loading}
                >
                    Login
                </button>
                

                <div className='auth__social-networks'>
                    <p className='auth__social-networks-title mt-1'>Login with social networks</p>
                
                    <button type="button" className="google-button mt-2" onClick={handleGoogleLogin}>
                        <span className="google-button__icon">
                            <svg viewBox="0 0 366 372" xmlns="http://www.w3.org/2000/svg"><path d="M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z" id="Shape" fill="#EA4335"/><path d="M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z" id="Shape" fill="#FBBC05"/><path d="M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z" id="Shape" fill="#4285F4"/><path d="M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z" fill="#34A853"/></svg>
                        </span>
                        <span className="google-button__text">Sign in with Google</span>
                    </button>
                </div>
                <Link 
                    to='/auth/register'
                    className='link auth__new-account'
                >
                    Create new account
                </Link>
            </form>
        </div>
    )
}
