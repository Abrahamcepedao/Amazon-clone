import React from 'react';
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import './Header.css';
import { useStateValue } from './StateProvider';
import  { auth } from "./firebase";

function Header() {
    const [{basket, user}] = useStateValue();

    const login = () => {
      if(user){
        auth.signOut();
      }
    }

    return (
      <nav className="header">
        <Link to="/">
          <img
            className="header__logo"
            src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt="Amazon"
          />
        </Link>

        <div className="header__searchBar">
          <input type="text" className="header__searchInput" />
          <SearchIcon className="header__searchIcon" />
        </div>

        <div className="header__nav">
          <Link to={!user && "/login"} className="header__link">
            <div className="header__option" onClick={login}>
              <span className="header__optionl1">Hello Cepe</span>
              <span className="header__optionl2">{user ? "Sign Out" : "Sign In"}</span>
            </div>
          </Link>
          <Link to="/orders" className="header__link">
            <div className="header__option">
              <span className="header__optionl1">Returns</span>
              <span className="header__optionl2">& Orders</span>
            </div>
          </Link>
          <Link to="/" className="header__link">
            <div className="header__option">
              <span className="header__optionl1">Your</span>
              <span className="header__optionl2">Prime</span>
            </div>
          </Link>
          <Link to="/checkout" className="header__link">
            <div className="header__optionBasket">
              <ShoppingBasketIcon className="header__basketIcon" />
              <span className="header__optionl2 header__basketCount">{basket?.length}</span>
            </div>
          </Link>
        </div>
      </nav>
    );
}

export default Header;
