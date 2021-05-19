import React from 'react'
import "./Orders.css"
import moment from "moment"

export default function Order() {
    return (
        <div className="order">
            <h2>Order</h2>
            <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
            <p className="order__id">
                <small>{order.id}</small>
            </p>
            {order.data.basket?map}
        </div>
    )
}
