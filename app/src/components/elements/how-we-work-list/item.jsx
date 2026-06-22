import React from 'react';
import { Link } from 'react-router-dom';
import Picture from '../picture';

const HowWeWorkItem = ({ data }) => {
  const { icon, link, title } = data || {};
  const Tag = !link?.items?.[0]?.external && link?.items?.[0]?.url ? Link : 'a';

  return (
    <Tag
      to={link?.items?.[0]?.url}
      href={link?.items?.[0]?.url}
      className="how-we-work__item"
    >
      {icon?.items?.[0]?.src && (
        <div className="how-we-work__icon">
          <Picture image={icon.items[0]} />
        </div>
      )}
      {title?.value && (
        <div className="how-we-work__title">
          <h3>{title.value}</h3>
        </div>
      )}
    </Tag>
  );
};

export default HowWeWorkItem;
