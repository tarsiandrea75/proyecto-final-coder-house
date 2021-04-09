import React, { useEffect, useState} from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import { getFirestore } from "../../configs/firebase";
import "firebase/firestore";

import CartWidget from '../CartWidget/CartWidget';
import Brand from '../Brand/Brand';

const NavBar = () => 
{
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const db = getFirestore();
        const categoriesCollection = db.collection("categories");
        categoriesCollection.get().then((querySnapshot) => {
            setCategories(
                querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            );
        });
    }, [])

    return ( 
        <div className="NavBar">
            <Navbar bg="dark" variant="dark" expand="lg">
                <NavLink to="/" className="nav-link">
                    <Navbar.Brand>
                        <Brand />
                    </Navbar.Brand>
                    <Navbar.Brand>
                        El Tano
                    </Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Categorías" id="basic-nav-dropdown">
                            {categories.map((category) => (
                                <NavLink key={category.id} to={`/category/${category.id}`} className="dropdown-item">
                                {category.name}
                                </NavLink>
                            ))}
                        </NavDropdown>
                        <NavLink to="/about-us" className="nav-link">Quiénes Somos</NavLink>
                        <NavLink to="/contact-us" className="nav-link">Contacto</NavLink>
                    </Nav>
                    <CartWidget />
                </Navbar.Collapse>
            </Navbar>
        </div>
    ) ;
}

export default NavBar;
