import React, { useState } from "react";
import Layout from "../core/Layout";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

const ForgotPassword = () => {

    const [values, setValues] = useState({
        email: '',
        buttonText: 'Submit'
    })

    const { email, password, buttonText } = values;

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleSubmit= (e) => {
        e.preventDefault();
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_URL}/forgot-password`,
            data: { email, password }
        }).then((resp) => {
            setValues({...values, email: '', buttonText: 'Submitted'});
            toast.success(resp.data.message);
        }).catch((error) => {
            setValues({...values, buttonText: 'Submit'});
            toast.error(error.response.data.error)
        })
    }

    const forgotPasswordForm = () => {
        return (
            <div className="main_div">
                <div className="box">
                    <h1>Forgot Password</h1>
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
                        <button type='submit' onClick={handleSubmit}>{buttonText}</button>
                    </form>
                </div>
            </div>
        )
    }

    return(
        <Layout>
            <div className='mt-3 col-md-6 offset-md-3'>
                <ToastContainer />
                {forgotPasswordForm()}
            </div>
        </Layout>
    )
}

export default ForgotPassword;