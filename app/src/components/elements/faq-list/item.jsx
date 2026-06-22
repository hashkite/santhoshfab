/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

const FaqItem = ({ data, index }) => {
  const { description, title } = data || {};

  return (
    <div className="faq__item">
      <div className="faq__item-number">
        <span>#{index >= 9 ? index+1 : `0${index+1}`}</span>
      </div>
      <div className="faq__item-content">
        <h3>{title?.value}</h3>
        {description?.value && (
          <div 
            className="faq__item-description"
            dangerouslySetInnerHTML={{ __html: description.value }} 
          />
        )}
      </div>
    </div>
  )
}

export default FaqItem