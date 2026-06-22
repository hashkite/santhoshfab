import React, { useState } from 'react';

import TabsItem from './item';
import TabsNavItem from './navItem';

import './tabs.scss';

const Tabs = ({ items, type }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className={`tabs__block${type ? ` --type-${type}` : ''}${items.length > 7 ? ' --cols-2' : ''}`}>
      <div className="tabs-block__nav">
        {items && items.map((item, index) => (
          <TabsNavItem 
            data={item}
            index={index}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            key={item?.id}
          />
        ))}
      </div>
      <div className="tabs-block__content">
        {items?.[selectedTab] && (
          <TabsItem data={items[selectedTab]} />
        )}
      </div>
    </div>
  )
}

export default Tabs