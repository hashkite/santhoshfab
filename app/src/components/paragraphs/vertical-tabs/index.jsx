import React from 'react';

import { VerticalTabsBlock } from '../../elements';

import './verticalTabs.scss';

const VerticalTabs = ({ data }) => {
  const { description, multicolor_title, tags, subtitle } = data || {};

  return (
    <section className="vertical-tabs__section">
      <div className="vertical-tabs__decor">
        <svg
          width="1920"
          height="83"
          viewBox="0 0 1920 83"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0H1920V83C1920 83 1524.5 3 960 3C395.5 3 0 83 0 83V0Z"
            fill="#E8EEF8"
          />
        </svg>
      </div>
      <div className="container">
        {multicolor_title?.value && (
          <div className="vertical-tabs__header">
            <div dangerouslySetInnerHTML={{ __html: multicolor_title.value }} />
            {description?.value && (
              <div
                className="vertical-tabs__description"
                dangerouslySetInnerHTML={{ __html: description.value }}
              />
            )}
          </div>
        )}
        {tags?.items && (
          <VerticalTabsBlock
            related={false}
            items={tags.items}
            title={subtitle?.value ? subtitle.value : ''}
          />
        )}
      </div>
    </section>
  );
};

export default VerticalTabs;
