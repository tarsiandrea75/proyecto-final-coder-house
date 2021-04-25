import { useState, useContext } from "react";
import { Redirect } from 'react-router-dom';

import { Form, Card, Row, Col, ListGroup, Button } from "react-bootstrap";
import firebase from "firebase/app";
import { getFirestore } from "../../configs/firebase";
import "firebase/firestore";

import CartContext from "../../contexts/CartContext";

    const Checkout = () => {
        const cartContext = useContext(CartContext);

        const [validated, setValidated] = useState(false);
        const [hideBuyButton, setHideBuyButton] = useState('inline-block');

        const db = getFirestore();
        
        function createOrderInDB(form) {
            
            const newOrder = {
              buyer: { 
                  id: 1, 
                  name: form.validationName.value,
                  surname: form.validationSurname.value, 
                  tel: form.validationPhone.value, 
                  email: form.formBasicEmail.value 
                },
                items: cartContext.cart,
                createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
                total: cartContext.cartTotal,
            };
        
            const orders = db.collection("orders");
        
            orders.add(newOrder)
                .then((order) => {
                    setHideBuyButton('none');
                    cartContext.createOrder(order.id);
                    cartContext.clear();
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });

             
        }

        const areEmailFieldsEquals = (form) => {
            
            const email = form.formBasicEmail.value;
            const emailDoubleCheck = form.formBasicEmailDoubleCheck.value;
            
            const equals = email.trim() === emailDoubleCheck.trim();
            if (!equals) {
                alert("Los dos email tienen que coincidir");
            }
            return equals;
        }

        const handleOnClickCheckout = (event) => {
            
            event.preventDefault();
            event.stopPropagation();
            
            const form = event.currentTarget;

            if (form.checkValidity() && areEmailFieldsEquals(form)) {
                createOrderInDB(form);
            } 
            
            setValidated(true);
        };

        return (
            <>
                {
                    (cartContext.cartLength === 0) 
                    ? 
                        <Redirect to={`/order/${cartContext.order.id}`}></Redirect>
                    : 
                    <>
                        <Form noValidate validated={validated} onSubmit={handleOnClickCheckout}>
                            <Form.Row className="mt-20 justify-content-center">
                                <Form.Group as={Col} md="4" controlId="validationName">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Nombre"                        
                                />
                                <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row className="mt-20 justify-content-center" >
                                <Form.Group as={Col} md="4" controlId="validationSurname">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Apellido"                        
                                />
                                <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row className="mt-20 justify-content-center" >
                                <Form.Group as={Col} md="4" controlId="validationPhone">
                                <Form.Label>Telefono</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Telefono"                        
                                />
                                <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row className="mt-20 justify-content-center">
                                <Form.Group as={Col} md="4" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control 
                                        required
                                        type="email" 
                                        placeholder="Email" 
                                    />
                                    <Form.Text className="text-muted">
                                        Vamos a compartir tu email con nuestros amigos...
                                    </Form.Text>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row className="mt-20 justify-content-center">
                                <Form.Group as={Col} md="4" controlId="formBasicEmailDoubleCheck">
                                    <Form.Label>Reingresá tu Email</Form.Label>
                                    <Form.Control 
                                        required
                                        type="email" 
                                        placeholder="Mismo email de arriba"                                 
                                    />
                                    <Form.Text className="text-muted">
                                        ...tus nuevos amigos!
                                    </Form.Text>
                                </Form.Group>
                            </Form.Row>
                            
                            <Button style={{display:hideBuyButton}} type="submit" >COMPRÁ!</Button>
                        </Form>
                        <Row className="mt-20 justify-content-center">
                            <Card className="m-all-10" style={{ width: "40rem" }}>
                                <Card.Header>RESUMEN</Card.Header>
                                    <Card.Body>
                                        <ListGroup>
                                            <ListGroup.Item><strong>TOTAL:</strong> ${cartContext.cartTotal}</ListGroup.Item>
                                            <ListGroup.Item><strong>ITEMS:</strong> {cartContext.cartLength}</ListGroup.Item>
                                        </ListGroup>
                                        <hr />
                                    </Card.Body>
                            </Card>
                        </Row>
                    </>    
                }        
            </>    
        );
    };

export default Checkout;
