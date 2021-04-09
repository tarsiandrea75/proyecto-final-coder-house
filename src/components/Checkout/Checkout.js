import { useContext } from "react";
import { Card, Row, ListGroup, Button } from "react-bootstrap";

import CartContext from "../../contexts/CartContext";

const Checkout = () => {
    const cartContext = useContext(CartContext);

    return (
        <Row className="mt-20 justify-content-center">
            <Card className="m-all-10" style={{ width: "40rem" }}>
                <Card.Header>FINALIZAR COMPRA</Card.Header>
                    <Card.Body>
                        <Card.Text className="text-muted">
                            <strong>CÓDIGO DE ORDEN: {cartContext.order.id}</strong>
                        </Card.Text>
                        <ListGroup>
                            <ListGroup.Item><strong>TOTAL:</strong> ${cartContext.cartTotal}</ListGroup.Item>
                            <ListGroup.Item><strong>ITEMS:</strong> {cartContext.cartLength}</ListGroup.Item>
                        </ListGroup>
                        <hr />
                        <Button className="m-all-10" variant="primary">
                            IR AL PAGO
                        </Button>
                    </Card.Body>
            </Card>
        </Row>
    );
};

export default Checkout;
