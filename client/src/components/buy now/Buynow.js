import React, { useEffect, useState } from 'react'
import "./buynow.css";
import { Divider } from '@mui/material';
import Option from './Option';
import Subtotal from './Subtotal';
import Right from './Right';
const Buynow = () => {
    const [cartdata, setcartdata] = useState("");
    console.log(cartdata.length);
    const getdatabuy = async () => {
        const res = await fetch("/cartdetails", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"

            },
            credentials: "include"
        });
        const data = await res.json();
        console.log(data);
        if (res.status !== 201) {
            console.log("error");
        }
        else {
            setcartdata(data.carts);
        }
    }
    useEffect(() => {
        getdatabuy();
    }, []);
    return (
        <>{
            cartdata.length ?
                <div className="buynow_section">
                    <div className="buynow_container">
                        <div className="left_buy">
                            <h1>Shopping Cart</h1>
                            <p>Select all items</p>
                            <span className="leftbuyprice">Price</span>
                            {console.log(cartdata)}
                            <Divider />
                            {
                                cartdata.map((e, k) => {
                                    console.log(e)
                                    return (

                                        <>
                                            <div className="item_containert" key={k} >
                                                <img src={e?.url} alt="" />
                                                <div className="item_details">
                                                    <h3>{e.title.longTitle}</h3>
                                                    <h3>{e.title.shortTitle}</h3>
                                                    <h3 className="differentprice">${e.price.cost}</h3>
                                                    <p className='unusual'>Usually delivered in 2 weeks.</p>
                                                    <p>Eligible for FREE Shipping</p>
                                                    <img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png" alt="logo" />
                                                    <Option deletedata={e.id} get={getdatabuy}/>
                                                </div>
                                                <h3 className='itemprice'>${e.price.cost}</h3>
                                            </div>
                                            <Divider />
                                        </>

                                    )
                                })
                            }


                            <Subtotal item={cartdata} />
                        </div>
                        <Right item={cartdata} />
                    </div>
                </div> : ""
        }

        </>
    )
}

export default Buynow