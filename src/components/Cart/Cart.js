import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, ListGroup, Button } from 'react-bootstrap';
import firebase from "firebase/app";
import { getFirestore } from "../../configs/firebase";
import "firebase/firestore";

import CartContext from '../../contexts/CartContext';

const Cart = () => 
{
    const db = getFirestore();
    const cartContext = useContext(CartContext);
    
    const handleOnClickRemove = (e, item) => {
        e.preventDefault();
        cartContext.removeItem(item);
    };

    const handleOnClickCheckout = () => {
        createOrderInDB();
    };

    function createOrderInDB() {
        
        const newOrder = {
          buyer: { id: 1, nombre: "Cliente Anonimo", email: "cliente_anonimo@gmail.com" },
          items: cartContext.cart,
          createOn: firebase.firestore.Timestamp.fromDate(new Date()),
          total: cartContext.cartTotal,
        };
    
        const orders = db.collection("orders");
    
        orders.add(newOrder)
        .then((order) => {
            cartContext.createOrder(order.id)
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
         });
      }
    

    const cartItems = cartContext.cart.map(
        (item, index) => {
            return (
                <ListGroup.Item key={index}>
                    <strong>{`${item.title}:`}</strong> {`$${item.price} x ${item.quantity}`}
                    <Button className="m-all-10" variant="outline-danger" onClick={ (e) => handleOnClickRemove(e, item) }>x</Button>
                </ListGroup.Item>
            )
    });

    return (
        <Row className="mt-20 justify-content-center">
            <Card className="m-all-10"  style={{ width: '40rem' }} >
            <Card.Header>Listado Compras</Card.Header>
                <Card.Body>
                { cartContext.cartLength ?
                    <>
                        <ListGroup>
                            {cartItems}
                        </ListGroup>
                        <Card.Footer className="text-muted">
                            TOTAL: ${cartContext.cartTotal}
                        </Card.Footer>
                        <Link to="/checkout">
                            <hr />
                            <Button className="m-all-10" variant="primary" onClick={ () => handleOnClickCheckout()}>COMPRAR!</Button>
                        </Link>
                    </>
                    :
                    <>
                        <Card.Text className="text-muted">
                            No compraste nada todavía!
                        </Card.Text>
                        <Link to="/">
                            <hr />
                            <hr /><Button className="m-all-10" variant="outline-success">VOLVER AL INICIO</Button>
                        </Link>
                    </>    
                }
                </Card.Body>
            </Card>
        </Row>
    );
};

export default Cart;