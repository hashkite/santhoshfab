import React from 'react';

import { BusinessNeedsItem } from '../../elements';

import './businessNeeds.scss';

const BusinessNeeds = ({ data }) => {
  const { business_teasers, multicolor_title, subtitle, title_position } =
    data || {};

  return (
    <section
      className={`business-needs__section${
        title_position?.value ? ' --title-' + title_position.value : ''
      }`}
    >
      <div className="container">
        {subtitle?.value && <div className="subtitle">{subtitle.value}</div>}
        {multicolor_title?.value && (
          <div dangerouslySetInnerHTML={{ __html: multicolor_title.value }} />
        )}
        {business_teasers?.items && (
          <div className="business-needs__list">
            {business_teasers.items.map((item, i) => (
              <BusinessNeedsItem data={item} key={item?.id} i={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BusinessNeeds;
