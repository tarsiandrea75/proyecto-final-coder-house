import NavBar from '../components/NavBar/NavBar';
import ItemList from '../components/ItemList/ItemList';
import ItemListContainer from '../components/ItemList/ItemListContainer'
import ItemDetailContainer from '../components/ItemDetail/ItemDetailContainer';
import AboutUs from '../components/AboutUs/AboutUs';
import Contact from '../components/Contact/Contact';
import Cart from '../components/Cart/Cart';

import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import { Container } from 'react-bootstrap';

const RouterApp = () => {
 return (
    <Router>
        <NavBar />
        <Container>
        <Switch>
            <Route path="/item/:itemId">
                <ItemDetailContainer />
            </Route>
            <Route path="/category/:categoryId">
                <ItemList />
            </Route>
            <Route path="/about-us">
                <AboutUs />
            </Route>
            <Route path="/contact-us">
                <Contact />
            </Route>
            {/* <Route path="/cart">
                <Cart />
            </Route> */}
            <Route exact path="/">
                <ItemListContainer />
            </Route>
        </Switch>
        </Container>
    </Router>
 );
}

export default RouterApp;