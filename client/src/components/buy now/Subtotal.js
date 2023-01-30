import { useState, useEffect } from "react"
import React from 'react'

const Subtotal = ({ item }) => {
    const [price, setPrice] = useState(0);
    useEffect(() => {
        totalAmount();
    }, [item])
    const totalAmount = () => {
        let price = 0;
        item.map((x) => {
            price = x.price.cost + price
        });
        setPrice(price)

    }
    return (
        <div className="sub_item">
            <h3>Subtotal ({item.length} tems): <strong style={{ fontWeight: 700, color: "#111" }}>${price}</strong></h3>
        </div>
    )
}

export default Subtotal