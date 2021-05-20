import React, { useState, useEffect } from 'react'
import "./Orders.css"
import {db} from './firebase'
import { useStateValue } from './StateProvider';
import Order from './Order'

export default function Orders() {
    const [{basket, user}, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        console.log(user)
        if(user) {
            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .orderBy('created', 'desc')
            .onSnapshot(snapshot => {
                let  dataa = []
                snapshot.docs.map(doc => {
                    let item = {
                        id: doc.id,
                        data: doc.data()
                    }
                    dataa.push(item)
                })
                console.log(dataa)
                console.log("holaa")
                setOrders(dataa)
            })
        } else {
            setOrders([])
        }
        
    }, [])

    return (
        <div className="orders">
            <h1>Orders</h1>
            <div className="orders__order">
                {orders?.map((order, i) => (
                    <Order key={i} order={order}/>
                ))}
            </div>
        </div>
    )
}
