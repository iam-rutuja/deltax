import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import axios from 'axios'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { getCookie, signout } from "../auth/helpers";

const Private = ({history}) => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        role: ''
    })

    const { name, email, role } = values;

    const token = getCookie('token');

    useEffect(() => {
        userInfo();
    }, [])

    const userInfo = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/user`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            const { name, email, role } = response.data.user;
            setValues({...values, name, email, role});
            toast.success(response.data.message);
        }).catch((error) => {
            if(error.response.status === 401){
                signout(() => {
                    history.push('/')
                })
            }
            toast.error(error.response.data.error);
        })
    }

    const privatePageForm = () => {
        return (
            <div className="main_div">
                <div className="box">
                    <h1>Private User</h1>
                    <form>
                        <div className="inputBox">
                            <input 
                                type='text'
                                name='name'
                                value={name}
                                required
                            />
                            <label>Name</label>
                        </div>
                        <div className="inputBox">
                            <input 
                                type='email'
                                name='email'
                                value={email}
                                required
                            />
                            <label>Email</label>
                        </div>
                        <div className="inputBox">
                            <input 
                                type='text'
                                name='role'
                                value={role}
                                required
                            />
                            <label>Role</label>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    return(
        <Layout>
            <div className='mt-3 col-md-6 offset-md-3'>
                <ToastContainer />         
                {privatePageForm()}
            </div>
        </Layout>
    )
}

export default Private;