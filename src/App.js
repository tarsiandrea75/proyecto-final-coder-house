import React from 'react';

import RouterApp from './routers/RouterApp';
import CartProvider from './providers/CartProvider';

import './App.css';

const App = () => 
{
    return (
        <div className="App">
            <CartProvider >
                <RouterApp />
            </CartProvider>
        </div>
    );
}

export default App;
