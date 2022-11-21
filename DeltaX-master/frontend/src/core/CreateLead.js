import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import axios from 'axios'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { getCookie, signout } from "../auth/helpers";

const CreateLead = () => {

    const [allStatus, setAllStatus] = useState([]);
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        status: '',
        buttonText: 'Submit'
    })

    const { firstName, lastName, email, gender, status, buttonText } = values;

    const token = getCookie('token');

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_URL}/post-lead`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { firstName, lastName, email, gender, status }
        }).then((response) => {
            setValues({...values, firstName: '', lastName: '', email: '', gender: '', status: '', buttonText: 'Submitted'});
            toast.success(response.data.message);
        }).catch((error) => {
            setValues({...values, buttonText: 'Submit'});
            toast.error(error.response.data.error);
        })
    }

    const getAllStatus = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/get-all-status`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response.data.status)
            setAllStatus(response.data.status)
        }).catch((error) => {
            console.log(error)
            toast.error(error.response.data.error);
        })
    }

    useState(() => {
        getAllStatus();
    }, [])

    const createLeadForm = () => {
        return (
            <div className="main_div">
                <div className="box">
                    <h1>Create Lead</h1>
                    <form>
                        <div className="inputBox">
                            <input 
                                type='text'
                                name='firstName' 
                                value={firstName}
                                onChange={handleChange} 
                                required
                            />
                            <label>First Name</label>
                        </div>
                        <div className="inputBox">
                            <input 
                                type='text'
                                name='lastName' 
                                value={lastName}
                                onChange={handleChange} 
                                required
                            />
                            <label>Last Name</label>
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
                        <div className="selectBox">
                            <select name="gender" onChange={handleChange}>
                                <option selected disabled>Select gender</option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                            </select>
                            <label>Gender</label>
                        </div>
                        <div className="selectBox">
                            <select name="status" onChange={handleChange}>
                                <option selected disabled>Select status</option>
                                {
                                    allStatus &&
                                    allStatus.map((data) => 
                                        <option key={data.id} value={data.status}>{data.status}</option>
                                    )
                                }
                            </select>
                            <label>Status</label>
                        </div>
                    </form>
                    <button type='submit' onClick={handleSubmit}>{buttonText}</button>
                </div>
            </div>
        )
    }

    return(
        <Layout>
            <div className='mt-3 col-md-6 offset-md-3'>
                <ToastContainer />         
                {createLeadForm()}
            </div>
        </Layout>
    )
}

export default CreateLead;