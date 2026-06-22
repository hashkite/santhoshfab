import React from 'react';
import Picture from '../picture';

const TabsItem = ({ data }) => {
  const { image, description, top_title, title } = data || {};

  return (
    <div className="tabs-block__item">
      {(image?.items?.[0] || title?.value) && (
        <div className="tabs-item__header">
          {image?.items?.[0]?.src && (
            <div className="tabs-item-header__image">
              <Picture image={image.items[0]} />
            </div>
          )}
          {title?.value && (
            <div className="tabs-item-header__cnt">
              {top_title?.value && (
                <div className="subtitle">{top_title.value}</div>
              )}
              <h3>{title.value}</h3>
            </div>
          )}
        </div>
      )}
      {description?.value && (
        <div className="tabs-item__cnt">
          <div
            className="tabs-item__description"
            dangerouslySetInnerHTML={{ __html: description.value }}
          />
        </div>
      )}
    </div>
  );
};

export default TabsItem;
