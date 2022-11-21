import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import axios from 'axios'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { getCookie, signout } from "../auth/helpers";

const CreateLead = () => {

    const [values, setValues] = useState({
        status: '',
        buttonText: 'Submit'
    });

    const { status, buttonText } = values;

    const token = getCookie('token');

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_URL}/post-status`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { status }
        }).then((response) => {
            setValues({...values, status: '', buttonText: 'Submitted'});
            toast.success(response.data.message);
        }).catch((error) => {
            setValues({...values, buttonText: 'Submit'});
            toast.error(error.response.data.error);
        })
    }

    const createStatusForm = () => {
        return (
            <div className="main_div">
                <div className="box">
                    <h1>Create Status</h1>
                    <form>
                        <div className="inputBox">
                            <input 
                                type='text'
                                name='status' 
                                value={status}
                                onChange={handleChange} 
                                required
                            />
                            <label>Status</label>
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
                {createStatusForm()}
            </div>
        </Layout>
    )
}

export default CreateLead;