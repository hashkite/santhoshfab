import React from 'react';

import HowWeWorkItem from './item';

import './howWeWorkList.scss';

const HowWeWorkList = ({ items }) => {
  return (
    <div className="how-we-work__list">
      {items && items.map(item => (
        <HowWeWorkItem 
          data={item}
          key={item?.id}
        />
      ))}
    </div>
  )
}

export default HowWeWorkList