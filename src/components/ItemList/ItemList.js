import React, {useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import Item from '../Item/Item';
import mockedItems from '../../data/mockedItems';

const ItemList = () => 
{
    const [items, setItems] = useState([]);
    const { categoryId } = useParams();

    useEffect(() => {
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(mockedItems);
            }, 2000);
        }).then((result) => { 
                setItems(categoryId ? result.filter((item) => item.categoryId === parseInt(categoryId)) : result); 
            });
        }, [categoryId]);
    
        return (
        <Row className="mt-20" style={{margin: 'auto'}}>
            { items.map((item, index) => <Item key={index} item={item} />) }
        </Row>
    );

}

export default ItemList;