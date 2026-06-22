import React from 'react';

import Office from './office';

import './offices.scss';

const Offices = ({ items }) => {
  return (
    <div className="offices__block">
      {items && items.map(item => (
        <Office 
          key={item?.id}
          data={item}
        />
      ))}
    </div>
  )
}

export default Offices