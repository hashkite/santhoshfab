import React from 'react';
import HorizontalTabsBlock from '../../elements/horizontal-tabs-block';

const HorizontalTabs = ({ data }) => {
  return (
    <div className="horizontal-tabs__section">
      <HorizontalTabsBlock items={data?.paragraphs?.items} />
    </div>
  )
}

export default HorizontalTabs