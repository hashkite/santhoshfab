import React from 'react';

import { ClientImpactCarousel } from '../../elements';

import './tabs.scss';

const TabsSection = ({ data }) => {
  const {
    description,
    title,
    multicolor_title,
    paragraphs,
    background_style: type,
  } = data || {};

  return (
    <div
      className={`tabs__section${type?.value ? ` --type-${type?.value}` : ''}`}
    >
      <div className="container">
        <div className="container__inner">
          {(title?.value || description?.value) && (
            <header className="tabs__header">
              {multicolor_title?.value && (
                <div
                  dangerouslySetInnerHTML={{ __html: multicolor_title.value }}
                />
              )}
              {description?.value && (
                <div
                  className="tabs__header-description"
                  dangerouslySetInnerHTML={{ __html: description.value }}
                />
              )}
            </header>
          )}
          {paragraphs?.items && (
            <div className="client-impact-carousel__wrapper">
              <ClientImpactCarousel items={paragraphs.items} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TabsSection;
