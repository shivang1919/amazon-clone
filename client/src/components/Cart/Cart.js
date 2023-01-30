import React, { useEffect, useState, useContext } from 'react'
import "./cart.css";
import { CircularProgress, Divider } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { LoginContext } from '../context/ContextProvider';
const Cart = () => {
    const { id } = useParams("");
    // console.log(id);
    const history = useNavigate("");
    const { account, setAccount } = useContext(LoginContext)
    const [indData, setinddata] = useState("");
    console.log(indData);
    const getindData = async () => {
        const res = await fetch(`/getproductsone/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        if (res.status !== 201) {
            console.log("no data availible");
        } else {
            console.log("getdata");
            setinddata(data);
        }
        console.log(data);
    }
    useEffect(() => {
        setTimeout(getindData,1000)
    }, [id]);
    const addtocart = async (id) => {
        const checkres = await fetch(`/addcart/${id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                indData
            }),
            credentials: "include"
        });
        const data1 = await checkres.json();
        console.log(data1 + "frontend data")
        if (checkres.status === 401 || !data1) {
            console.log("user invalid");
            alert("user invalid");
        } else {
            // alert("data added in your cart");
            // console.log(data1);
            history("/buynow")
            setAccount(data1);
        }
    }
    return (
        <div className="cart_section">
            {indData && Object.keys(indData).length &&
                <div className="cart_container">
                    <div className="left_cart">
                        <img src={indData.url} alt="cart image" />
                        <div className="cart_btn">
                            <button className='cart_btn1' onClick={() => addtocart(indData.id)}>Add to Cart</button>
                            <button className='cart_btn2'>Buy Now</button>
                        </div>

                    </div>
                    <div className="right_cart">
                        <h3>{indData.title.shortTitle}</h3>
                        <h4>{indData.longTitle}</h4>
                        <Divider />
                        <p className="mrp">{indData.price.mrp}</p>
                        <p>Deal of the Day : <span style={{ color: "#B12704" }}>{indData.price.cost}</span></p>
                        <p>You save : <span style={{ color: "#B12704" }}>{indData.price.mrp - indData.price.cost} ({indData.price.discount})</span></p>
                        <div className="discount_box">
                            <h5>Discount: <span style={{ color: '#111' }}>Extra 10% Off</span></h5>
                            <h4>Free Delivery : <span style={{ color: "#111", fontWeight: 600 }}>Jan 20-22</span> Details</h4>
                            <p>Fastest delivery: <span style={{ color: "#111", fontWeight: 600 }}>Tomorrow 12 noon</span></p>
                        </div>
                        <p className='description'>About The Item: <span style={{ color: "#111", fontWeight: 400, fontSize: 14 }}>{indData.description}</span></p>
                    </div>
                </div>
            }
            {!indData ? <div className='circle'>
                <CircularProgress />
                <h2>Loading...</h2>
            </div> : ""}
        </div>
    )
}

export default Cart