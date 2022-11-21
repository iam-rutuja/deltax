import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import axios from 'axios'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { getCookie, signout } from "../auth/helpers";
import { Link } from "react-router-dom";

const Lead = () => {

    const main_div = {
        width: "100%",
        height: "90vh",
        position: "relative",
        background: "#E3E3E3"
    }

    const box = {
        width: "1000px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "50px",
        background: "rgba(0, 0, 0, 0.8)",
        borderRadius: "10px"
    }

    const box_h1 = {
        marginBottom: "30px",
        color: "#FFFFFF",
        textAlign: "center",
        textTransform: "capitalize"
    }

    const table = {
        width: "100%"
    }

    const head = {
        width: "100%",
        lineHeight: "60px"
    }

    const body = {
        width: "100%",
        lineHeight: "30px"
    }

    const head_tr = {
        color: "#03a9f4",
        textAlign: "left"
    }

    const body_tr = {
        color: "#E3E3E3"
    }

    const actions = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around"
    }

    const actionBtn = {
        cursor: "pointer"
    }

    const link = {
        all: "unset"
    }

    useEffect(() => {
        leadList();
    }, [])

    const [values, setValues] = useState([])

    const token = getCookie('token');

    const leadList = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/leads`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setValues(response.data.leads);
        }).catch((error) => {
            toast.error(error.response.data.error);
        })
    }

    const leadListing = () => {
        return (
            <div style={main_div}>
                <div style={box}>
                    <h1 style={box_h1}>Lead Listing</h1>
                    <table style={table}>
                        <thead style={head}>
                            <tr style={head_tr}>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody style={body}>
                            {
                                values &&
                                values.map((value, index) => (
                                    <tr key={index} style={body_tr}>
                                        <Link style={link} href={{
                                            pathname: `/lead/${value.id}`,
                                            query: {int: value.id}
                                        }} key={value.id}>
                                            <td>{value.firstName}</td>
                                            <td>{value.lastName}</td>
                                            <td>{value.email}</td>
                                            <td>{value.gender}</td>
                                            <td>{value.status}</td>
                                        </Link> 
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    return(
        <Layout>
            <div className='mt-3 col-md-6 offset-md-3'>
                <ToastContainer />         
                {leadListing()}
            </div>
        </Layout>
    )
}

export default Lead;