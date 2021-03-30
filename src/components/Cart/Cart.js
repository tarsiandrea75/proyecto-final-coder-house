import { Card, Row, ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Cart = ({cart}) => {

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartItemsCount = cart.length;
    
    const cartItems = cart.map(
        (item, index) => {
            return (
                <ListGroup.Item key={index}>
                    <strong>{`${item.title}:`}</strong> {`$${item.price} x ${item.quantity}`}
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
                        <Link to="#">
                            <Button className="m-all-10" variant="primary">COMPRAR!</Button>
                        </Link>
                    </>
                    :
                    <Card.Text className="text-muted">
                        No compraste nada todavía!
                    </Card.Text>
                }
                </Card.Body>
            </Card>
        </Row>
    );
};

export default Cart;