import React from 'react';

import { Button, Picture } from '../../elements';
import { Icon } from '../svg';

import './scrollableItemText.scss';

const ScrollableItemText = ({ data }) => {
  const { description, link, multicolor_title, image } = data || {};

  return (
    <div className="scrollable-item__text-block">
      {image?.items?.[0]?.src && (
        <div className="scrollable-item__icon">
          <Picture image={image.items[0]} />
        </div>
      )}
      <div className="scrollable-item__content">
        {multicolor_title?.value && (
          <div dangerouslySetInnerHTML={{ __html: multicolor_title.value }} />
        )}
        {description?.value && (
          <div
            className="scrollable-item__description"
            dangerouslySetInnerHTML={{ __html: description.value }}
          />
        )}
        {link?.items?.[0] && (
          <div className="scrollable-item__btn">
            <Button
              className="btn btn-m btn-gray-border-2"
              data={link.items[0]}
            >
              <div className="icon">
                <Icon
                  icon="arrow--long--right"
                  color="#5C00DB"
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
};

export default ScrollableItemText;
