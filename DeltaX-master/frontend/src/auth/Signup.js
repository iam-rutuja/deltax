import React, { useState } from "react";
import Layout from "../core/Layout";
import axios from 'axios'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Redirect } from "react-router-dom";
import { isAuth } from "./helpers";

const Signup = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        buttonText: 'Sign Up'
    })

    const { name, email, password, confirmPassword, buttonText } = values;

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_URL}/signup`,
            data: { name, email, password, confirmPassword }
        }).then((resp) => {
            setValues({...values, name: '', email: '', password: '', confirmPassword: '', buttonText: 'Submitted'});
            toast.success(resp.data.message);
        }).catch((error) => {
            setValues({...values, buttonText: 'Submit'});
            toast.error(error.response.data.error);
        })
    }

    const signupForm = () => {
        return (
            <div className="main_div">
                <div className="box">
                    <h1>Signup</h1>
                    <form>
                        <div className="inputBox">
                            <input 
                                type='text'
                                name='name' 
                                value={name}
                                onChange={handleChange} 
                                required
                            />
                            <label> Name</label>
                        </div>
                        <div className="inputBox">
                            <input 
                                type='text'
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
                        <div className="inputBox">
                            <input 
                                type='password'
                                name='confirmPassword'
                                value={confirmPassword}
                                onChange={handleChange} 
                                required
                            />
                            <label>Confirm Password</label>
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
                {isAuth() ? <Redirect to='/' /> : null}     
                {signupForm()}
            </div>
        </Layout>
    )
}

export default Signup;