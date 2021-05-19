import React, { useState, useEffect } from 'react'
import "./Orders.css"
import {db} from './firebase'
import { useStateValue } from './StateProvider';

export default function Orders() {
    const [{basket, user}, dispatch] = useStateValue();
    const [order, setOrders] = useState([]);

    useEffect(() => {
        if(user) {
            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .orderBy('creacted', 'desc')
            .onSnapshot(snapshot => {
                setOrders(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
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
                    
                ))}
            </div>
        </div>
    )
}
