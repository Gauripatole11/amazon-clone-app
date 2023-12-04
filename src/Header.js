import React from 'react';
import './Header.css';
import { Search } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from "./firebase";
//import { app, analytics } from './firebase'; // Update the import statement

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut();
    }
  }

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header_logo"
          src="https://www.shutterstock.com/image-vector/amazon-logo-editorial-icon-isolated-260nw-2313339121.jpg"
          alt="Amazon Logo"
        />
      </Link>

      <div className="header_search">
        <Search />
        <input className="header_searchInput" type="text" />
        <Search className="header_searchIcon" />
      </div>

      <div className="header_nav">
      <Link to={!user && '/login'}>
          <div onClick={handleAuthenticaton} className="header__option">
            <span className="header__optionLineOne">Hello Guest</span>
            <span className="header__optionLineTwo">{user ? 'Sign Out' : 'Sign In'}</span>
          </div>
        </Link>

       
        <div className="header_option">
          <span className="header_optionLineOne">Returns</span>
          <span className="header_optionLineTwo">& Orders </span>
        </div>
        <div className="header_option">
          <span className="header_optionLineOne">Your</span>
          <span className="header_optionLineTwo"> Prime </span>
        </div>
      </div>

      <Link to="/checkout">
        <div className="header_optionBasket">
          {/* Assuming you want to use a Basket icon, replace 'Basket' with the actual icon */}
          {/* <Basket className="header_optionBasket" size={30} /> */}
          <span className="header_optionLineTwo header_basketCount">
            {basket?.length}
          </span>
        </div>
      </Link>
    </div>
  );
}

export default Header;
