import React from 'react';

import FaqItem from './item';

import './faqList.scss';

const FaqList = ({ items }) => {
  return (
    <div className="faq__list">
      {items && items.map((item, index) => (
        <FaqItem 
          key={item?.id}
          data={item}
          index={index}
        />
      ))}
    </div>
  )
}

export default FaqList