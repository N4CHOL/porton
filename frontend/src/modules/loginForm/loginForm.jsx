// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import './loginForm.css'
import EyeIcon from '../../assets/img/logo/eye.svg'; // Import your SVG eye icon
//import { useNavigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../utilities/context/AuthContext';
import { useIntl } from 'react-intl';

export default function LoginForm() {






    const { login } = useAuth();
    const intl = useIntl();
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    // var placeholder = FormattedMessage


    // const navigate = useNavigate();
    const navigate = useNavigate(); // Initialize navigate hook
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            // Call the login function with the entered username, password, and navigation function (if needed)
            await login(user, password, navigate)
            // Redirect the user to a new page upon successful login (if needed)
            // history.push('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            // Handle login error (e.g., display error message to the user)
        }

    };

    return (
        <>
            <div className="flex justify-center items-center">

                <h1 className='loginTitle' >
                    <FormattedMessage id='loginCardTitle' />
                </h1>

            </div>
            <div className="grid ">
                <div className='mb-4'>
                    <input className='loginInput' value={user} onChange={(e) => setUser(e.target.value)} placeholder={intl.formatMessage({ id: 'Email' })} />

                </div>




                <div className="password-input-wrapper">
                    <input
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        className='loginInput'
                        type={showPassword ? "text" : "password"}
                        placeholder={intl.formatMessage({ id: 'password' })}
                    />
                    <img
                        src={EyeIcon}
                        alt="Toggle Password Visibility"
                        className="eye-icon"
                        onClick={() => setShowPassword(!showPassword)}
                    />
                </div>
                <button className='bg-blue-500 mt-8 text-black hover:bg-blue-400' onClick={handleClick}><FormattedMessage id='login' /></button>

                <div>
                    
                </div>



            </div>
        </>
    )
}
