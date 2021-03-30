import { useState } from 'react';
import { Link } from 'react-router-dom';

import {ListGroup, Button} from 'react-bootstrap';

import ItemCount from '../ItemCount/ItemCount';

const ItemDetail = ({item, addToCart, cart}) => {
    const [stockNow, setStockNow] = useState(item.stock);

    const updateStock = (e, quantity) => {
        e.preventDefault();
        if (quantity > 0 && quantity <= stockNow) {
            setStockNow((stockNow) => stockNow - quantity);
            addToCart({id: item.id, title: item.title, price: item.price, quantity: quantity})
        }
    };

    return (
        <>
            <ListGroup>
                <ListGroup.Item>Stock: <strong>{stockNow}</strong></ListGroup.Item>
                <ListGroup.Item>{item.description}</ListGroup.Item>
            </ListGroup>
            {stockNow > 0 && <ItemCount stock={stockNow} initial={1} onAdd={updateStock} />}
            { cart.length ?
                <Link to="/cart" className="nav-link">
                    <hr /><Button className="m-all-10" variant="primary">CARRITO</Button>
                </Link> : ''
            }
        </>
    );
}

export default ItemDetail;
