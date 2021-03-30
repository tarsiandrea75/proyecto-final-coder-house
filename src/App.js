import {React, useState} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import { Container } from 'react-bootstrap';

import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemList from './components/ItemList/ItemList';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import AboutUs from './components/AboutUs/AboutUs';
import ContactUs from './components/ContactUs/ContactUs';
import Cart from './components/Cart/Cart';

import './App.css';

const App = () => 
{
    const backgroundImage = `url(${process.env.PUBLIC_URL}/images/banner.jpg)`;
    
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {

        let itemFoundIndex = cart.findIndex(elem => elem.id === item.id);
        if (itemFoundIndex !== -1) {
            cart[itemFoundIndex].quantity++;
        } else {
            setCart([...cart, item]);
        }
    };

    return (
        <div className="App">
            <BrowserRouter>
                <NavBar />
                <div style={ {backgroundImage: backgroundImage} }>
                    <h1 className="navbar-center" style={{"textAlign": "center"}}>
                        LA TIENDA DEL TANO
                    </h1>  
                </div>
                <Container>
                    <Switch>
                        <Route exact path='/' component={ItemListContainer }></Route>
                        <Route path='/about-us' component={AboutUs}></Route>
                        <Route path='/contact-us' component={ContactUs}></Route>
                        <Route path="/item/:itemId">
                            <ItemDetailContainer addToCart={addToCart} cart={cart} />
                        </Route>
                        <Route path='/category/:categoryId?' component={ItemList}></Route>
                        <Route path="/cart/"> 
                            <Cart cart={cart} />
                        </Route>
                        <Redirect to="/"/>
                    </Switch> 
                </Container>
            </BrowserRouter>
        </div>
    );
}

export default App;
