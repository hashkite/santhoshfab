import React from 'react';

import { Button } from '../../elements';
import { Icon } from '../../elements/svg';

import './startCooperation.scss';

const StartCooperation = ({ data }) => {
  const { multicolor_title, link, description } = data || {};

  return (
    <section className="start-cooperation__section">
      <div className="container">
        {multicolor_title?.value && (
          <div dangerouslySetInnerHTML={{ __html: multicolor_title.value }} />
        )}
        {description?.value && (
          <div className="row">
            <div
              className="col-md-8 offset-md-2 mb-lg"
              dangerouslySetInnerHTML={{ __html: description.value }}
            />
          </div>
        )}
        {link?.items?.[0] && (
          <Button className="btn btn-secondary" data={link.items[0]}>
            <Icon
              icon="arrow--long--right"
              color="#fff"
              height="12px"
              width="18px"
            />
          </Button>
        )}
      </div>
    </section>
  );
};

export default StartCooperation;
