import React from 'react';
import { NavLink } from 'react-router-dom';

import CartImage from '../../assets/images/cart.jpeg';
import './CartWidget.css';

const CartWidget = () => {
    return (
        <NavLink to="/cart" className="nav-link">
            <img src={CartImage} className="Cart-img" alt="Cart" />
        </NavLink>
    )
}

export default CartWidget;