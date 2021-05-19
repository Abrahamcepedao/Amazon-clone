import React, {useState, useEffect} from 'react'
import "./Payment.css"
import { Link, useHistory } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import CurrencyFormat from "react-currency-format";

import { useStateValue } from './StateProvider'
import { getBasketTotal } from "./reducer";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

import  {db} from './firebase'

import axios from "./axios"

export default function Payment() {
    const [{basket, user}, dispatch] = useStateValue();

    const stripe = useStripe();
    const elements = useElements();

    const history = useHistory();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState(false);

    useEffect(() => {
        console.log(user)
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${getBasketTotal(basket) * 1000}`
            })
            setClientSecret(response.data.clientSecret)
            console.log(response.data.clientSecret)
        }
        getClientSecret()
    }, [basket])

    

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true)

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            //paymentIntent === paymentConfirmation
            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                })

            setSucceeded(true)
            setError(null)
            setProcessing(false)
            dispatch({
                type: "EMPTY_BASKET"
            })
            history.replace('/orders')
        })
    }

    const handleChange = (event) => {
        setDisabled(event.empty)
        setError(event.error ? event.error.message : "");
    }
    
    return (
        <div className="payment">
            <div className="payment__container">
                <h1>Checkout (<Link to="/checkout">{basket?.length} items</Link>)</h1>
                {/* delivery */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery address</h3>
                    </div>
                    <div className="payment__addess">
                        <p>{user?.email}</p>
                        <p>Yucatan country club</p>
                        <p>Merida, Yucatann</p>
                    </div>
                </div>
                {/* review items */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                image={item.image}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
                {/* payment method */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment method</h3>
                    </div>
                    <div className="payment__details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className="paymment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <>
                                            <p>
                                                Order total: <strong>{` ${value}`}</strong>
                                            </p>
                                        </>
                                    )}
                                    value={getBasketTotal(basket)}
                                    decimalScale={2}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy now"}</span>
                                </button>
                            </div>

                            {/* error */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
