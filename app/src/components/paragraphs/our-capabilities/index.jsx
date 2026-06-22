import React from 'react';

import { OurCapabilitiesItem, Picture } from '../../elements';

import './ourCapabilities.scss';
import { getData } from '../../../shared/api';

const OurCapabilities = ({ data, ...other }) => {
  const { description, capabilities, multicolor_title } = data || {};
  const { node_id } = other || {};
  const { data: technologies } = getData(`search-by-partners/technologies/block_1/${node_id}`);
  const { rows: technologies_rows } = technologies?.data || {};

  return (
    <section className="our-capabilities__section">
      <div className="container">
        { multicolor_title?.value && (
          <div className="our-capabilities__header row text-center">
            <div className="col-md-8 offset-md-2">
              <div
                dangerouslySetInnerHTML={ { __html: multicolor_title.value } }
              />
              { description?.value && (
                <div
                  className="our-capabilities__description"
                  dangerouslySetInnerHTML={ { __html: description.value } }
                />
              ) }
            </div>
          </div>
        ) }
        <div className="row">
          { capabilities?.items && (
            <div className="col-md-7 our-capabilities__list-col">
              <div className="our-capabilities__list">
                { capabilities.items.map((item, index) => (
                  <OurCapabilitiesItem data={ item } key={ index } />
                )) }
              </div>
            </div>
          ) }
          { technologies_rows?.[ 0 ] && (
            <div className="col-md-5 our-capabilities__techs-col">
              <div className="our-capabilities__techs">
                { technologies_rows.map(item => {
                  const { image, id, title } = item;

                  return (
                    <div className="our-capabilities__tech" key={ id }>
                      <div className="our-capabilities__tech-item">
                        { image?.items?.[ 0 ] && (
                          <Picture image={ image.items[ 0 ] } />
                        ) }
                        { title }
                      </div>
                    </div>
                  );
                }) }
              </div>
            </div>
          ) }
        </div>
      </div>
    </section>
  );
};

export default OurCapabilities;