import React, { useState } from "react";
import Layout from "../core/Layout";
import axios from 'axios';
import { authenticate, isAuth } from '../auth/helpers';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import { Link, Redirect } from "react-router-dom";
import '../styles/signin.css';

const Signin = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        buttonText: 'Sign In'
    })

    const { email, password, buttonText } = values;

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleSubmit= (e) => {
        e.preventDefault();
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_URL}/signin`,
            data: { email, password }
        }).then((resp) => {
            toast.success(resp.data.message);
            authenticate(resp, () => {
                setValues({...values, email: '', password: '', buttonText: 'Submitted'});
            })
        }).catch((error) => {
            setValues({...values, buttonText: 'Submit'});
            toast.error(error.response.data.error)
        })

    }

    const signinForm = () => {
        return(
            <div className="main_div">
                <div className="box">
                    <h1>Sign In</h1>
                    <form>
                        <div className="inputBox">
                            <input 
                                type='email'
                                name='email'
                                value={email}
                                onChange={handleChange} 
                                required
                            />
                            <label>Email</label>
                        </div>
                        <div className="inputBox">
                            <input 
                                type='password'
                                name='password'
                                value={password}
                                onChange={handleChange} 
                                required
                            />
                            <label>Password</label>
                        </div>
                        <div className="forgotPassword_container">
                            <Link className="nav-link" to="/auth/forgot/password">
                                Forgot password?
                            </Link>
                        </div>
                        <button type='submit' onClick={handleSubmit}>{buttonText}</button>
                    </form>
                </div>
            </div>
        )
    }

    return(
        <Layout>
            <div className='mt-6 col-md-6 offset-md-3'>
                <ToastContainer />
                {isAuth() ? <Redirect to={isAuth().role === 'admin' ? '/admin' : '/private'} /> : null}
                {signinForm()}
            </div>
        </Layout>
    )
}

export default Signin;