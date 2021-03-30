import {useEffect, useState} from 'react';
import { Card, Row } from 'react-bootstrap';
import {useParams} from 'react-router-dom';

import ItemDetail from '../ItemDetail/ItemDetail';
import mockedItems from '../../data/mockedItems'
import {createMockedRequest, filterByField} from '../../helper/Helper';

import MissingItaly from '../../assets/images/missing-italy.png';

const ItemDetailContainer = ({addToCart, cart}) => 
{
    const [item, setItem] = useState({});
    const [itemFound, setItemFound] = useState(false);
    const { itemId } = useParams();

    useEffect(() => {
        createMockedRequest(2000, mockedItems).then((result) => {
            const items = filterByField(result, "id", parseInt(itemId));
            if (items) {
                setItem(items[0])
                setItemFound(true);
            } else {
                setItemFound(false);
            }
        });
    }, [itemId]);

    return (
        <>
            { 
                itemFound 
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
  