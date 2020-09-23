import React, { useState } from 'react';
import firebase from "firebase";
import "./Login.css";
import { Link, useHistory } from '@material-ui/core';
import { auth } from "./firebase";
import { useStateValue } from './StateProvider';

function Login() {
    const [{user}, dispatch] = useStateValue();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [passowrd, setPassword] = useState("");

    const login = e =>{
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
        .then((auth) => {
            history.push("/");
        })
        .catch(e => alert(e.message))
    }

    const register = (e) => {
      e.preventDefault();
      auth.createUserWithEmailAndPassword(email, password)
      .then(auth => {
        history.push("/");
      })
      .catch(e => alert(e.message))
    };

    return (
      <div className="login">
        <Link>
          <img
            className="login__logo"
            src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          />
        </Link>
        <div className="login__container">
          <h1>Sign In</h1>
          <form>
            <h5>Email</h5>
            <input
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <h5>Password</h5>
            <input
              type="password"
              value={passowrd}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button onClick={login} type="submit">
              Sign In
            </button>
          </form>
          <p>By signing-in you agree to ...</p>
          <button onClick={register}>Creta your amazon account</button>
        </div>
      </div>
    );
}

export default Login;
