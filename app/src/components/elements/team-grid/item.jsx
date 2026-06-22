import React from 'react';
import { Link } from 'react-router-dom';

import { Picture } from '../';
import { Icon } from '../svg';
import { abbreviateLastName } from '../../../shared/utils';

const TeamItem = ({ data, last }) => {
  const { image, role, title, url, expertise, country_ref } = data || {};
  const { icon } = country_ref?.items?.[0] || {};
  const name = abbreviateLastName(title);

  if (last) {
    return (
      <a href="/hire" className="team-grid__item --last">
        <div className="team-grid-item__image">
          <img src="/media/icons/icon-famaash.svg" alt="Famaash" />
        </div>
        <div className="team-grid-item__content">
          <h3>Looking for more Talent options?</h3>
          <p>We can help.</p>
          <button className="btn btn-m btn-white-2">
            <Icon
              icon="arrow--long--right"
              color="#F8FBFF"
              height="11px"
              width="18px"
            />
            <span className="text">Talk to Us</span>
          </button>
        </div>
      </a>
    );
  }

  return (
    <div className="team-grid__item">
      {/* <Link to={ url } className="team-grid__item"> */}
      {image?.items?.[0]?.src && (
        <div className="team-grid-item__image">
          <Picture image={image.items[0]} />
          {/* <div className="btn btn-purple btn-circle">
            <Icon
              icon="arrow--long--right"
              color="#F8FBFF"
              height="11px"
              width="18px"
            />
          </div> */}
        </div>
      )}
      <div className="team-grid-item__content">
        {icon?.items?.[0]?.src && (
          <div className="person__flag">
            <Picture image={icon.items[0]} />
          </div>
        )}
        <h3>{name}</h3>
        {role?.items?.[0] && (
          <div className="team-grid-item__role">{role.items[0]}</div>
        )}
      </div>
      {expertise?.items && (
        <div className="team-grid-item__expertise">
          <div className="expertise__list">
            {expertise.items.map((item, index) => (
              <div className="expertise__item" key={index}>
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
      {/* </Link> */}
    </div>
  );
};

export default TeamItem;
