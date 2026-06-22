import React from 'react';

import { Button, Picture } from '../';
import { Icon } from '../svg';

const VerticalTabsItem = ({ data, related }) => {
  const { description, teaser_text, image, link, subtitle, url } = data || {};

  if (!related) {
    return (
      <div className="vertical-tabs__tab-inner">
        {image?.items?.[0]?.src && (
          <div className="vertical-tabs__tab-image">
            <Picture image={image.items[0]} />
          </div>
        )}
        <div className="vertical-tabs__tab-content">
          {subtitle?.value && <h3>{subtitle.value}</h3>}
          {description?.value && (
            <div
              className="vertical-tabs__tab-description"
              dangerouslySetInnerHTML={{ __html: description.value }}
            />
          )}
          {link?.items?.[0] && (
            <div className="business-needs__button">
              <Button className="btn btn-secondary" data={link.items[0]}>
                <div className="icon">
                  <Icon
                    icon="arrow--long--right"
                    color="#fff"
                    height="11px"
                    width="22px"
                  />
                </div>
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="row related-services__content">
        <div className="col-lg-8 offset-lg-2 text-center">
          {teaser_text?.value && (
            <div dangerouslySetInnerHTML={{ __html: teaser_text.value }} />
          )}
          {url && (
            <Button
              className="btn btn-secondary mt-md"
              data={{ url, title: "Let's Discuss" }}
            >
              <div className="icon">
                <Icon
                  icon="arrow--long--right"
                  color="#fff"
                  height="11px"
                  width="22px"
                />
              </div>
            </Button>
          )}
        </div>
      </div>
    );
  }
};

export default VerticalTabsItem;
