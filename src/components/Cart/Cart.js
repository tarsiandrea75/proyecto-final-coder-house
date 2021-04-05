import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, ListGroup, Button } from 'react-bootstrap';


import CartContext from '../../contexts/CartContext';

const Cart = ({cart}) => 
{
    const cartContext = useContext(CartContext);
    const cartTotal = cartContext.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartItemsCount = cartContext.cart.length;
    
    const handleOnClick = (e, item) => {
        e.preventDefault();
        cartContext.removeItem(item);
    };

    const cartItems = cartContext.cart.map(
        (item, index) => {
            return (
                <ListGroup.Item key={index}>
                    <strong>{`${item.title}:`}</strong> {`$${item.price} x ${item.quantity}`}
                    <Button className="m-all-10" variant="outline-danger" onClick={ (e) => handleOnClick(e, item) }>x</Button>
                </ListGroup.Item>
            )
    });

    return (
        <Row className="mt-20 justify-content-center">
            <Card className="m-all-10"  style={{ width: '40rem' }} >
            <Card.Header>Listado Compras</Card.Header>
                <Card.Body>
                { cartItemsCount ?
                    <>
                        <ListGroup>
                            {cartItems}
                        </ListGroup>
                        <Card.Footer className="text-muted">
                            TOTAL: ${cartTotal}
                        </Card.Footer>
                        <Link to="/checkout">
                            <Button className="m-all-10" variant="primary">COMPRAR!</Button>
                        </Link>
                    </>
                    :
                    <>
                        <Card.Text className="text-muted">
                            No compraste nada todavía!
                        </Card.Text>
                        <Link to="/">
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