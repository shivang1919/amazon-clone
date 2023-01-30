import React, { useState,useContext } from 'react';
import "./signin.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from '../context/ContextProvider';



const Sign_in = () => {
    const navigate=useNavigate();
    const [logdata, setdata] = useState({
        email: "",
        password: ""
    });
    const {account,setAccount} = useContext(LoginContext);
    const adddata = (e) => {
        const { name, value } = e.target;
        setdata(() => {
            return {
                ...logdata,
                [name]: value
            }
        })
    }
    const senddata = async (e) => {
        e.preventDefault();
        const { email, password } = logdata;
        const res = await fetch("/login", {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });
        const data = await res.json();
        console.log(data);
        if (res.status === 400 || !data) {
            console.log("invalid details");
            toast.warn("invalid details", {
                position: 'top-center'
            })
        } else {
            console.log("data valid")
            setAccount(data)
            toast.success("login done successfully", {
                position: "top-center"
            })
            setdata({ ...logdata, email: "", password: "" });
            navigate("/")

        }
    }
    return (
        <>
            <section>
                <div className="sign_container">
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="sign_form">
                        <div className="sign_header">
                            <img src="./blacklogoamazon.png" alt="amazonlogo" />
                        </div>
                        <form method='POST'>
                            <h1>Good to See u again</h1>
                            <br />
                            <div className="form_data">
                                <label htmlFor="email">Email</label>
                                <input type="text" onChange={adddata} value={logdata.email} name="email" placeholder='Enter your email address' id="email" />
                            </div>
                            <div className="form_data">
                                <label htmlFor="password">Password</label>
                                <input type="password" onChange={adddata} value={logdata.password} name="password" placeholder='at least 6 characters' id="password" />
                            </div>
                            <br />
                            <button className="signin_btn" onClick={senddata} >Start Shopping</button>
                            
                        </form>
                        <div className="create_accountinfo">
                            <p>New To Amazon</p>
                            <NavLink to="/register"><button>Create Your Amazon Account</button></NavLink>
                        </div>
                        <br />
                        <br />
                    </div>

                </div>
                <ToastContainer />
            </section>
        </>
    )
}

export default Sign_in