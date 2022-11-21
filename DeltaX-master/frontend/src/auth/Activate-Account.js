import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

const Signin = ({match}) => {

    const [values, setValues] = useState({
        firstName: '',
        token: ''
    })

    useEffect(() => {
        let token = match.params.token;
        let { firstName } = jwt.decode(token);
        if(token){
            setValues({...values, firstName, token})
        }
    }, []);

    const { firstName, token } = values;


    const handleSubmit= (e) => {
        e.preventDefault();
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_URL}/account-activate`,
            data: { token }
        }).then((resp) => {
            toast.success(resp.data.message);
        }).catch((error) => {
            toast.error(error.response.data.error)
        })
    }

    const activateAccount = () => {
        return(
            <div className="main_div">
                <div className="box">
                    <h1>Hey {firstName}, click on below button to activate your account</h1>
                    <button type='submit' onClick={handleSubmit}>Activate-Account</button>
                </div>
            </div>
        )
    }


    return(
        <Layout>
            <div className='mt-3 col-md-6 offset-md-3'>
                <ToastContainer />
                {activateAccount()}
            </div>
        </Layout>
    )
}

export default Signin;