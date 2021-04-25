import React, {useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getFirestore } from "../../configs/firebase";

import Item from '../Item/Item';

const ItemList = () => 
{
    const [items, setItems] = useState([]);
    const { categoryId } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(
        () => {
            const db = getFirestore();
            const collection = db.collection("items");
            const products = categoryId ? collection.where('categoryId', '==', parseInt(categoryId)) : collection.orderBy("categoryId");
            products.get().then((result) => {
                setLoading(false);
                setItems(result.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
            });
        }, 
        [categoryId]
    )
    
    return (
        <>
            {
                loading
                ? 
                    <div>Cargando...</div>
                :
                    <Row className="mt-20 justify-content-center " style={{margin: 'auto'}}>
                        { items.map((item) => <Item key={item.id} item={item} />) }
                    </Row>
            }
        </>
    );

}

export default ItemList;