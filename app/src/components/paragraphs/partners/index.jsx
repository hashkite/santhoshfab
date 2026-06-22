import React from 'react';
import { Picture } from '../../elements';

import './partners.scss';

const Sponsors = ({ items, description, multicolor_title }) => {
  return (
    <div className="partners__block pt-lg">
      <div className="container">
        {(multicolor_title?.value || description?.value) && (
          <div className="partners__header text-center row mb-lg">
            <div className="col-md-8 offset-md-2">
              {multicolor_title?.value && (
                <div
                  className="title mb-md"
                  dangerouslySetInnerHTML={{ __html: multicolor_title.value }}
                />
              )}
              {description?.value && (
                <div
                  className="description"
                  dangerouslySetInnerHTML={{ __html: description.value }}
                />
              )}
            </div>
          </div>
        )}

        <div className="partners__items">
          {items?.map(item => {
            const img = item?.image?.items?.[0] || {};

            return (
              <div key={item.id} className="partners__item">
                <Picture image={img} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
