import React from 'react';
import Picture from '../picture';
import Button from '../button';

import './ourExpertiseItem.scss';

const OurExpertiseItem = ({ data }) => {
  const { teaser_text, icon, title, url } = data || {};

  return (
    <div className="our-expertise__item">
      {icon?.items?.[0]?.src && (
        <div className="our-expertise__item-icon">
          <Picture image={icon.items[0]} />
        </div>
      )}
      {title && (
        <div className="our-expertise__item-content">
          <h3>{title}</h3>
          {teaser_text?.value && (
            <div
              className="our-expertise__item-description"
              dangerouslySetInnerHTML={{ __html: teaser_text.value }}
            />
          )}
        </div>
      )}
      <Button data={{ url, title }} />
    </div>
  );
};

export default OurExpertiseItem;
