import React from 'react';

import { Button } from '../../elements';

import './getInTouchWithUs.scss';
import { Icon } from '../../elements/svg';

const GetInTouchWithUs = ({ data }) => {
  const { description, link, multicolor_title } = data || {};

  return (
    <section className="get-in-touch-with-us__section">
      <div className="container">
        <div className="get-in-touch-with-us__block">
          { multicolor_title?.value && (
            <div
              className="get-in-touch-with-us__title"
              dangerouslySetInnerHTML={ { __html: multicolor_title.value } }
            />
          ) }
          { description?.value && (
            <div
              className="get-in-touch-with-us__desc"
              dangerouslySetInnerHTML={ { __html: description.value } }
            />
          ) }
          { link?.items?.[ 0 ] && (
            <div className="get-in-touch-with-us__button">
              <Button
                className="btn btn-secondary"
                data={ link.items[ 0 ] }
              >
                <div className="icon">
                  <Icon
                    icon="arrow--long--right"
                    height="11px"
                    width="18px"
                    color="#fff"
                  />
                </div>
              </Button>
            </div>
          ) }
        </div>
      </div>
    </section>
  );
};

export default GetInTouchWithUs;