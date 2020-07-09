import React, { useContext } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import LogoWhite from '../../assets/images/LogoWhite.png';
import cart from '../../assets/images/cart.png';

const Navbar = () => {
  const { shoppingCart } = useContext(AppContext);

  const cartCount = Object.values(shoppingCart).reduce(
    (acc, item) => acc + item.count,
    0
  );
  return (
    <div>
      <header className="navbar">
        <div className="navbar-left">
          <div className="nav-items">
            <Link to="/">
              <div className="logo-white">
                <img src={LogoWhite} alt="logo"></img>
              </div>
            </Link>
            <Link to="/produce">
              <div className="navbar__item_left">Produce</div>
            </Link>
            <Link to="/farms">
              <div className="navbar__item_left">Farms</div>
            </Link>
            <Link to="/community">
              <div className="navbar__item_left">Community</div>
            </Link>
          </div>
        </div>
        <div className="navbar-right">
          <div className="nav-items">
            <Link to="/help">
              <div className="navbar__item">Help</div>
            </Link>
            <Link to="/account">
            <img src={"https://res.cloudinary.com/farmersmarket/image/upload/v1592794964/profile_icon_gqhoam.png"} style={{ height: '41px', width: '46px' }} alt="profile"></img>
            </Link>
            <Link to="/checkout">
              <div className="navbar__item">
                <img src={cart} alt="cart" style={{ height: '41px', width: '46px' }}></img>
                <span>{cartCount || ''}</span>
              </div>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};
export default Navbar;
