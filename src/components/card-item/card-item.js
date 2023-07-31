import React from 'react';

import './card-item.scss';

const CardItem = ({data}) => {
    return (
        <div className='cards-item__container'>
            <img src={data.image} alt={data.name} className='cards-item__image' />
            <h2 className='cards-item__title'>{data.name}</h2>
        </div>
    );
};

export default CardItem;