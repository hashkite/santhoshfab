import React from 'react';

import FootprintItem from './item';

import './footprints.scss';

const Footprints = ({ items }) => {
  return (
    <div className="footprints__list">
      {items && items.map(item => (
        <FootprintItem 
          data={item}
          key={item?.id}
        />
      ))}
    </div>
  )
}

export default Footprints