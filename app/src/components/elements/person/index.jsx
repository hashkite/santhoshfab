import React from 'react';
import './person.scss';
import Picture from '../picture';
import { abbreviateLastName } from '../../../shared/utils';

const Person = ({ item }) => {
  const { person } = item;
  const { image, title, country_ref } = person?.items?.[0] || {};
  const { icon, title: country } = country_ref?.items?.[0] || {};
  const name = abbreviateLastName(title);

  return (
    <div className="person">
      {image?.items?.[0]?.src && (
        <div className="person__pic">
          <Picture image={image.items[0]} />
        </div>
      )}
      <div className="person__cnt">
        {icon?.items?.[0]?.src && (
          <div className="person__flag">
            <Picture image={icon.items[0]} />
            {country && <span className="person__country">{country}</span>}
          </div>
        )}
        {title && <div className="person__title">{name}</div>}
      </div>
    </div>
  );
};
export default Person;
