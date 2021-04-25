import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import { Container } from 'react-bootstrap';

import NavBar from '../components/NavBar/NavBar';
import ItemList from '../components/ItemList/ItemList';
import ItemListContainer from '../components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from '../components/ItemDetailContainer/ItemDetailContainer';
import AboutUs from '../components/AboutUs/AboutUs';
import ContactUs from '../components/ContactUs/ContactUs';
import Cart from '../components/Cart/Cart';
import Checkout from '../components/Checkout/Checkout';
import Order from '../components/Order/Order';

const RouterApp = () => 
{
    const backgroundImage = `url(${process.env.PUBLIC_URL}/images/banner.jpg)`;

    return (
        <Router>
            <NavBar />
            <div style={ {backgroundImage: backgroundImage} }>
                <h1 className="navbar-center text-white my-4" style={{"textAlign": "center"}}>
                    LA TIENDA DEL TANO
                </h1>  
            </div>
            <Container>
                <Switch>
                    <Route exact path='/' component={ItemListContainer } ></Route>
                    <Route path='/about-us' component={AboutUs} ></Route>
                    <Route path='/contact-us' component={ContactUs} ></Route>
                    <Route path="/item/:itemId">
                        <ItemDetailContainer /> 
                    </Route>
                    <Route path='/category/:categoryId?' component={ItemList} ></Route>
                    <Route path="/cart/"> 
                        <Cart /> 
                    </Route>
                    <Route path="/checkout/"> 
                        <Checkout /> 
                    </Route>
                    <Route path="/order/:orderId"> 
                        <Order /> 
                    </Route>
                    <Redirect to="/"/>
                </Switch> 
            </Container>
        </Router>
    );
}

export default RouterApp;