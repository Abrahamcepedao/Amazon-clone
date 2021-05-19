import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Checkout from './Checkout';
import Header from './Header';
import Home from "./Home";
import Login from './Login';
import Payment from './Payment';
import Orders from './Orders';
import { useStateValue } from './StateProvider';
import { auth } from "./firebase";
import { Unsubscribe } from '@material-ui/icons';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const promise = loadStripe("pk_test_51IssDVGiAVe4jN7IlgZSsdhT22RtoTItZ10hyq3yjiPe8zMcKy8eWFQse4N9Rr48WitRpojjbh0UWa7022hiuEOo0042buZgxh");

function App() {
  const [{user}, dispatch] = useStateValue();

  useEffect(() => {
   const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        dispatch({
          type: "SET_USER",
          user: authUser
        })
      } else{
        dispatch({
          type: "SET_USER",
          user: null
        })
      }
    });
    return () => 
      unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/checkout">
            <Header />
            <Checkout/>
          </Route>
          <Route path="/orders">
            <Header />
            <Orders/>
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment/>
            </Elements>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/">
            <Header/>
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
