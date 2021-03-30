import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'

import CartWidget from '../CartWidget/CartWidget';
import Brand from '../Brand/Brand';

const NavBar = () => 
{
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
                            <NavLink to="/category/1" className="dropdown-item">Comida</NavLink>
                            <NavLink to="/category/2" className="dropdown-item">Bebida</NavLink>
                            <NavLink to="/category/3" className="dropdown-item">Musica</NavLink>
                            <NavDropdown.Divider />
                            <NavLink to="/category/4" className="dropdown-item">Todo para la Vendetta</NavLink>
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
