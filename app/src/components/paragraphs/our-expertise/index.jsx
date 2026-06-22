import React from 'react';

import { OurExpertiseItem } from '../../elements';

import './ourExpertise.scss';

const OurExpertise = ({ data }) => {
  const { description, sub_services, multicolor_title } = data || {};

  return (
    <section className="our-expertise__section">
      <div className="our-expertise__decor">
        <svg
          width="1920"
          height="129"
          viewBox="0 0 1920 129"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0H1920V51C1920 51 1522.5 129 960 129C397.5 129 0 51 0 51V0Z"
            fill="#E8EEF8"
          />
        </svg>
      </div>
      <div className="container">
        <div className="our-expertise__donut" />
        {multicolor_title?.value && (
          <div className="our-expertise__header">
            <div dangerouslySetInnerHTML={{ __html: multicolor_title.value }} />
            <div
              className="our-expertise__description"
              dangerouslySetInnerHTML={{ __html: description?.value }}
            />
          </div>
        )}
        {sub_services?.items && (
          <div className="our-expertise__list">
            {sub_services.items.map(item => (
              <OurExpertiseItem data={item} key={item?.id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OurExpertise;
