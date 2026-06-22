import React from 'react';

import { HowWeWorkList } from '../../elements';

import './howWeWork.scss';

const HowWeWork = ({ data }) => {
  const { description, paragraphs, multicolor_title } = data || {};

  return (
    <section className="how-we-work__section">
      <div className="how-we-work__decor">
        <svg
          width="1920"
          height="82"
          viewBox="0 0 1920 82"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0H1920V4C1920 4 1522.5 82 960 82C397.5 82 0 4 0 4V0Z"
            fill="#F8FBFF"
          />
        </svg>
      </div>
      <div className="container">
        {multicolor_title?.value && (
          <div className="how-we-work__header">
            <div dangerouslySetInnerHTML={{ __html: multicolor_title.value }} />
            {description?.value && (
              <div
                className="how-we-work__description"
                dangerouslySetInnerHTML={{ __html: description.value }}
              />
            )}
          </div>
        )}
        {paragraphs?.items && <HowWeWorkList items={paragraphs.items} />}
      </div>
    </section>
  );
};

export default HowWeWork;
