import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sign_up = () => {
    const [udata, sdata] = useState({
        fname: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: ""
    });
    const adddata = (e) => {
        const { name, value } = e.target;
        sdata(() => {
            return {
                ...udata,
                [name]: value
            }
        })
    }
    const senddata = async (e) => {
        e.preventDefault();
        const { fname, email, mobile, password, cpassword } = udata
        // if(fname===""){
        //     toast.warn("fname provide",{
        //         position:"top-center",
        //     })
        // }else if(email===""){
        //         toast.warn(" provide email ".{
        //             position:"top-center"
        //         })
        //     }
        // }
        const res = await fetch("register", {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify({
                fname, email, mobile, password, cpassword
            })
        });
        const data = await res.json();
        console.log(data);
        if (res.status === 422 || !data) {
            toast.warn("inavalid details", {
                position: "top-center"
            })
        } else {
            // alert("data successfully added");
            toast.success("data successfully added", {
                postition: "top-center"
            })
            sdata({ ...udata, fname: "", email: "", mobile: "", password: "", cpassword: "" });
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
                        <form className='POST'>
                            <h1>Sign Up</h1>
                            <br />
                            <div className="form_data">
                                <label htmlFor="name">Your Name</label>
                                <input type="text" onChange={adddata} value={udata.fname} name="fname" placeholder='What is your good name ?' id="fname" />
                            </div>
                            <div className="form_data">
                                <label htmlFor="email">Email</label>
                                <input type="text" onChange={adddata} value={udata.email} name="email" placeholder='Enter your email address' id="email" />
                            </div>
                            <div className="form_data">
                                <label htmlFor="number">Mobile</label>
                                <input type="text" onChange={adddata} value={udata.mobile} name="mobile" placeholder='Enter your mobile number' id="mobile" />
                            </div>
                            <div className="form_data">
                                <label htmlFor="password">Password</label>
                                <input type="password" onChange={adddata} value={udata.password} name="password" placeholder='at least 6 characters' id="password" />
                            </div>
                            <div className="form_data">
                                <label htmlFor="password">Password Again</label>
                                <input type="password" onChange={adddata} value={udata.cpassword} name="cpassword" placeholder='Password should be same' id="password" />
                            </div>
                            <br />
                            <button className="signin_btn" onClick={senddata} >Continue</button>
                            <div className="signin_info">
                                <p>Already Have an account?</p>
                                <NavLink to="/login">Sign in</NavLink>
                            </div>
                        </form>

                    </div>
                    <ToastContainer />

                    <br />
                    <br />
                </div>
            </section>
        </>
    )
}

export default Sign_up