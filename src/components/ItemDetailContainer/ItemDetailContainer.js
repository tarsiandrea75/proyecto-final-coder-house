import {useEffect, useState} from 'react';
import { Card, Row } from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import { getFirestore } from "../../configs/firebase";

import ItemDetail from '../ItemDetail/ItemDetail';

import MissingItaly from '../../assets/images/missing-italy.png';

const ItemDetailContainer = ({addToCart, cart}) => 
{

    const [item, setItem] = useState({});
    const [itemFound, setItemFound] = useState(false);
    const [loading, setLoading] = useState(true);
    const { itemId } = useParams();

    useEffect(
        () => {
            const db = getFirestore();
            const product = db.collection("items").doc(itemId);
            
            product.get().then((result) => { 
                setLoading(false);
                if (result && result.data()) {
                    setItem({ id: result.id, ...result.data() })
                    setItemFound(true);
                } else {
                    setItemFound(false);
                }
            });
        }, [itemId]
    );

    return (
        <>
            { 
                loading
                ?
                    <div>Buscando...</div>
                : itemFound 
                ?
                <Row className="mt-20 d-flex justify-content-center">
                
                    <Card className="ml-all-10"  style={{ width: '25rem' }} >
                        <Card.Img variant="top" src={item.pictureUrl} />
                        <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                                Precio: <strong>${item.price}</strong>
                            <ItemDetail item={item} addToCart={addToCart} cart={cart} />
                        </Card.Body>
                    </Card>
                
                </Row>
                :
                <Row className="mt-20 d-flex justify-content-center">
                    <Card className="ml-all-10"  style={{ width: '25rem' }} >
                        <Card.Img variant="top" src={MissingItaly} />
                        <Card.Body>
                            <Card.Title>Que vas buscando...</Card.Title>
                        </Card.Body>
                    </Card>
                </Row>
            }
      </>
    );
  }

  export default ItemDetailContainer; 
  