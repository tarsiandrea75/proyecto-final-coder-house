import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Table, Card, Row, Button } from 'react-bootstrap';

import CartContext from '../../contexts/CartContext';

const Cart = () => 
{
    const cartContext = useContext(CartContext);

    const handleOnClickRemove = (e, item) => {
        e.preventDefault();
        cartContext.removeItem(item);
    };
    
    const cartItems = cartContext.cart.map(
        (item, index) => {
            return (
                <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>${item.price}</td>
                    <td>{item.quantity}</td>
                    <td>${item.quantity * item.price}</td>
                    <td><Button className="m-all-10" variant="outline-danger" onClick={ (e) => handleOnClickRemove(e, item) }>x</Button></td>
                </tr>
            )
        }
    );

    return (
        <Row className="mt-20 justify-content-center">
            <Card className="m-all-10"  style={{ width: '40rem' }} >
            <Card.Header>TU CARRITO</Card.Header>
                <Card.Body>
                { cartContext.cartLength ?
                    <>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Sub Totales</th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems}
                            </tbody>
                        </Table>
                        <Card.Footer className="font-weight-bold">
                            TOTAL: $ {cartContext.cartTotal}
                        </Card.Footer>
                        <Link to="/checkout">
                            <hr />
                            <Button className="m-all-10" variant="primary">IR A LA COMPRA</Button>
                        </Link>
                        <Link to="/">
                            <hr />
                            <hr /><Button className="m-all-10" variant="outline-success">Seguir Comprando</Button>
                        </Link>
                    </>
                    :
                    <>
                        <Card.Text className="font-weight-bold">
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