import CartContext from '../contexts/CartContext';
import { useState } from 'react';

const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);
    const [cartLength, setCartLength] = useState(0);
    const [order, setOrder] = useState({});

    const findIndex = (item) => {
        return cart.findIndex(elem => elem.id === item.id);
    };

    const isInCart = (item) => {
        return findIndex(item) !== -1 ? true : false;
    };

    const addItem = (item) => {
        let itemIndex = findIndex(item);
        if (isInCart(item)) {
            cart[itemIndex].quantity += parseInt(item.quantity);
        } else {
            setCart([...cart, item]);
        }
        setCartLength(cartLength + parseInt(item.quantity));
    };

    const removeItem = (item) => {
        if(isInCart(item)) {
            setCart(cart.filter(function(i) {
                return i.id !== item.id
            }));
            setCartLength(cartLength - parseInt(item.quantity));
        }
    };

    const clear = () => {
        setCart([]);
        setCartLength(0);
    }

    const cartTotal = cart.reduce(
        (total, item) => {
            return total + item.price * item.quantity
        }, 
        0
    );
    

    const createOrder = (id) => {
        setOrder({ id: id });
      };


    return <CartContext.Provider value={{cart, cartLength, addItem, removeItem, isInCart, clear, order, createOrder, cartTotal}}>
        {children}
    </CartContext.Provider>
}

export default CartProvider;