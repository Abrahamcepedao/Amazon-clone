import React from 'react';
import "./Checkout.css"
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import Subtotal from './Subtotal';

function Checkout() {
    const [{basket}] = useStateValue();
    return (
      <div className="checkout">
        <div className="checkout__left">
          <img
            className="checkout__ad"
            src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Currency_v1_es_US_2x._CB428993288_.jpg"
          />
          <div>
            {basket?.length === 0 ? (
              <div className="checkout__empty">
                <h2>Your shopping basket is empty</h2>
                <p>Add an item to your cart!</p>
              </div>
            ) : (
              <div>
                <h2 className="checkout__title">Your shopping basket</h2>
                {basket.map((item) => (
                  <CheckoutProduct
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    image={item.image}
                    rating={item.rating}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        {basket?.length > 0 && (
            <div className="checkout__right">
                <Subtotal/> 
            </div>
        )}
      </div>
    );
}

export default Checkout;
