import React, { useState } from 'react';
import FaqAccordionItem from './item';
import './faq-accordion.scss';

const FaqAccordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-accordion">
      {items &&
        items.map((item, index) => (
          <FaqAccordionItem
            key={item?.id}
            data={item}
            isActive={activeIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
    </div>
  );
};

export default FaqAccordion;
