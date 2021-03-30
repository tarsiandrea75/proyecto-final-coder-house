import React from 'react';

import BrandLogo from '../../assets/images/brand.jpeg';
import './Brand.css';

const Brand = () => {
    return (
        <img src={BrandLogo} className="Brand-img" alt="Brand Tano Face" />
    )
}

export default Brand;