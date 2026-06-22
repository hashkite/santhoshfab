/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Picture from '../picture';

const TabsNavItem = ({ data, index, selectedTab, setSelectedTab }) => {
  const { title, image } = data || {};

  return (
    <div
      className={`tabs-nav__item${selectedTab === index ? ' selected' : ''}`}
      onClick={() => {
        setSelectedTab(index);
      }}
    >
      {image?.items?.[0]?.src && (
        <div className="tabs-nav__item-image">
          <Picture image={image.items[0]} />
        </div>
      )}
      {title?.value && (
        <div className="tabs-nav__item-title">
          <h3>{title?.value}</h3>
        </div>
      )}
    </div>
  );
};

export default TabsNavItem;
