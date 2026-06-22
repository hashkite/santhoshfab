import React, { useState } from 'react';

import VerticalTabsNav from './nav';
import VerticalTabsItem from './item';

import './verticalTabs.scss';

const VerticalTabsBlock = ({ items, randomItems, title, related }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  if (!related) {
    return (
      <div className="vertical-tabs__block">
        <div className="vertical-tabs__nav-wrapper">
          {title && <div className="vertical-tabs__nav-title">{title}</div>}
          <VerticalTabsNav
            related={related}
            items={items}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </div>
        <div className="vertical-tabs__tab">
          {items[selectedTab] && <VerticalTabsItem data={items[selectedTab]} />}
        </div>
      </div>
    );
  } else if (related && randomItems) {
    return (
      <>
        {randomItems[selectedTab] && (
          <VerticalTabsItem related={related} data={randomItems[selectedTab]} />
        )}
        <VerticalTabsNav
          related={related}
          items={randomItems}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </>
    );
  }
};

export default VerticalTabsBlock;
