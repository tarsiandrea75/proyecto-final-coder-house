import React, { useContext} from 'react';
import { NavLink } from 'react-router-dom';
import { Badge } from 'react-bootstrap';

import CartContext from '../../contexts/CartContext';

import CartImage from '../../assets/images/cart.jpeg';
import './CartWidget.css';

const CartWidget = () => 
{
    const cartContext = useContext(CartContext);
    const cartItemsCount = cartContext.cartLength;
    
    return (
            <NavLink to="/cart" className="nav-link">
                {
                    cartItemsCount > 0 && 
                        <Badge pill variant="info" className="notify-badge">{cartItemsCount} </Badge>
                    
                }
                <img src={CartImage} className="Cart-img" alt="Cart" />
                
            </NavLink>
    )
}

export default CartWidget;