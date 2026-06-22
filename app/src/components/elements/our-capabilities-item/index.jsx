import React from 'react';
// import { Link } from 'react-router-dom';

import { Icon } from '../svg';

import './ourCapabilitiesItem.scss';
import Picture from '../picture';

const OurCapabilitiesItem = ({ data }) => {
  const { url, title, image } = data || {};
  // const Tag = !external && url ? Link : 'a';
  const Tag = 'span';

  return (
    <Tag to={url} href={url} className="our-capabilities__item">
      {image?.items?.[0]?.src && (
        <div className="img">
          <Picture image={image.items[0]} />
        </div>
      )}
      <div className="text">{title}</div>
      {/*<div className="icon">
        <Icon icon="arrow--right" color="#5C00DB" heihgt="15px" width="16px" />
      </div>*/}
    </Tag>
  );
};

export default OurCapabilitiesItem;
