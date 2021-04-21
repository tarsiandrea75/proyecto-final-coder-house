import {useEffect, useState} from 'react';
import { Card, ListGroup, Row, Table } from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import { getFirestore } from "../../configs/firebase";

import MissingItaly from '../../assets/images/missing-italy.png';

const Order = () => 
{

    const [receipt, setReceipt] = useState({});
    const [orderFound, setOrderFound] = useState(false);
    const [loading, setLoading] = useState(true);
    const [orderItems, setOrderItems] = useState([]);
    const { orderId } = useParams();

    useEffect(
        () => {
            const db = getFirestore();
            const order = db.collection("orders").doc(orderId);
            
            order.get().then((result) => { 
                setLoading(false);
                if (result && result.data()) {
                    setReceipt(result.data());
                    setOrderItems(result.data().items.map(
                        (item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.title}</td>
                                    <td>${item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.quantity * item.price}</td>
                                </tr>
                            )
                        }
                    ));    
                    setOrderFound(true);    
                } else {
                    setOrderFound(false);
                }
            });
        }, [orderId]
    );

    const toDateTime = (secs)=> {
        let t = new Date(1970, 0, 1); // Epoch
        t.setSeconds(secs);
        return t;
    }

    const formatDate = (date) => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [day, month, year].join('-');
    }

    return (
        <>
            { 
                loading
                ?
                    <div>Buscando...</div>
                : 
                    orderFound 
                        ?
                            <Row className="mt-20 d-flex justify-content-center">
                                <Card className="ml-all-10"  style={{ width: '25rem' }} >
                                    <Card.Title>TU ORDEN </Card.Title>
                                    <Card.Body>
                                        <ListGroup>
                                            <ListGroup.Item>Código:<strong>{orderId}</strong></ListGroup.Item>
                                            <ListGroup.Item>Fecha: <strong>{formatDate(toDateTime(receipt.createdAt.seconds))}</strong></ListGroup.Item>
                                            <ListGroup.Item>Total: <strong>${receipt.total}</strong></ListGroup.Item>
                                            
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                                <Table striped bordered hover responsive>
                                        <thead>
                                            <tr>
                                            <th>Nombre</th>
                                            <th>Precio</th>
                                            <th>Cantidad</th>
                                            <th>Sub Totales</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orderItems}
                                        </tbody>
                                </Table>
                            
                            </Row>
                        :
                            <Row className="mt-20 d-flex justify-content-center">
                                <Card className="ml-all-10"  style={{ width: '25rem' }} >
                                    <Card.Img variant="top" src={MissingItaly} />
                                    <Card.Body>
                                        <Card.Title>No se encontró la orden</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Row>
            }
      </>
    );
  }

  export default Order; 
  