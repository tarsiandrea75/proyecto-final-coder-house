import React, {useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getFirestore } from "../../configs/firebase";

import Item from '../Item/Item';

const ItemList = () => 
{
    const [items, setItems] = useState([]);
    const { categoryId } = useParams();

    useEffect(
        () => {
            const db = getFirestore();
            const collection = db.collection("items");
            const products = categoryId ? collection.where('categoryId', '==', parseInt(categoryId)) : collection;
            products.get().then((result) => {
                setItems(result.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
            });
        }, 
        [categoryId]
    )
    
    return (
        <Row className="mt-20" style={{margin: 'auto'}}>
            { items.map((item) => <Item key={item.id} item={item} />) }
        </Row>
    );

}

export default ItemList;