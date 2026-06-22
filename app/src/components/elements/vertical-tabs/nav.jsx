/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Picture from '../picture';

const VerticalTabsNav = ({ items, selectedTab, setSelectedTab, related }) => {
  if (!related) {
    return (
      <div className="vertical-tabs__nav">
        {items?.map((item, index) => (
          <div
            className={`vertical-tabs__nav-item${
              selectedTab === index ? ' selected' : ''
            }`}
            tabIndex={0}
            role="button"
            key={item?.id}
            onClick={() => setSelectedTab(index)}
          >
            <div className="nav-item__number">
              {index > 8 ? index + 1 : '0' + (index + 1)}
            </div>
            {item?.icon?.items?.[0]?.src && (
              <div className="nav-item__icon">
                <Picture image={item.icon.items[0]} />
              </div>
            )}
            {item?.title && <div className="nav-item__title">{item.title}</div>}
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="mt-xl related-services__nav">
        {items?.map((item, index) => (
          <div
            className={`related-services__nav-col${
              selectedTab === index ? ' selected' : ''
            }`}
            key={item?.id}
          >
            <div
              role="button"
              tabIndex={0}
              className="related-services__nav-item"
              onClick={() => setSelectedTab(index)}
            >
              <div className="icon">
                {item?.icon?.items?.[0]?.src && (
                  <Picture image={item.icon.items[0]} />
                )}
              </div>
              {item?.title && <div className="title">{item.title}</div>}
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default VerticalTabsNav;
