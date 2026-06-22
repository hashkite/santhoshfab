import React from 'react';

import { ScrollableItemImages, ScrollableItemText } from '../../elements';

import './scrollableItems.scss';

const ScrollableItems = ({ data }) => {
  const { paragraphs } = data || {};
  
  return (
    <section className="scrollable-items__section">
      <div className="container">
        {paragraphs?.items && (
          <div className="scrollable-items__list">
            <div className="scrollable-items__texts">
              {paragraphs.items.map(item => (
                <ScrollableItemText 
                  key={item?.id}
                  data={item}
                />
              ))}
            </div>
            <div className="scrollable-items__nav">
              {paragraphs.items.map((item, index) => (
                <i 
                  className={`scrollable-items__nav-item${index === 0 ? ' selected' : ''}`}
                  key={item?.id}
                />
              ))}
            </div>
            <div className="scrollable-items__images">
              {paragraphs.items.map(item => (
                <ScrollableItemImages 
                  key={item?.id}
                  data={item}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ScrollableItems