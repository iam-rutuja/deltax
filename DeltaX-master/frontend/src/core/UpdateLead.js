import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import axios from 'axios'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { getCookie, signout } from "../auth/helpers";
import { useParams } from "react-router-dom";

const UpdateLead = () => {

    const { id } = useParams()

    const [allStatus, setAllStatus] = useState([]);
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        status: '',
        buttonText: 'Update'
    })

    const { firstName, lastName, email, gender, status, buttonText } = values;

    const token = getCookie('token');

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values)
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_URL}/update-lead/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { firstName ,lastName, email, gender, status }
        }).then((response) => {
            setValues({...values, buttonText: 'Updated'});
            toast.success(response.data.message);
        }).catch((error) => {
            setValues({...values, buttonText: 'Update'});
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
            setAllStatus(response.data.status)
        }).catch((error) => {
            toast.error(error.response.data.error);
        })
    }

    const getLeadInfo = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/lead/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            const { firstName, lastName, email, gender, status } = response.data.lead;
            setValues({...values, firstName, lastName, email, gender, status});
        }).catch((error) => {
            toast.error(error.response.data.error);
        })
    }

    useState(() => {
        getAllStatus();
        getLeadInfo();
    }, [id])

    const updateLeadForm = () => {
        return (
            <div className="main_div">
                {
                    console.log("VALUES",values)
                }
                <div className="box">
                    <h1>Lead Details</h1>
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
                            <select name="gender" value={gender} onChange={handleChange}>
                                <option selected disabled>Select gender</option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                            </select>
                            <label>Gender</label>
                        </div>
                        <div className="selectBox">
                            <select name="status" value={status} onChange={handleChange}>
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
                {updateLeadForm()}
            </div>
        </Layout>
    )
}

export default UpdateLead;