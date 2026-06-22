import React from 'react';

import { OurTeamItem } from '../../elements';

import './ourTeam.scss';

const OurTeam = ({ data }) => {
  const {
    description,
    image,
    link,
    multicolor_title,
    subtitle,
    team_members,
    title,
  } = data || {};

  return (
    <section className="our-team__section">
      <div className="our-team__decor">
        <svg
          width="1920"
          height="104"
          viewBox="0 0 1920 104"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask id="mask" x="0" y="0" width="100%" height="100%">
            <rect x="-1" y="0" width="1922" height="104" fill="white" />
            <path
              d="M0 -3.09944e-06C0 -3.09944e-06 583.861 104 960 104C1336.14 104 1920 -3.09944e-06 1920 -3.09944e-06H0Z"
              fill="black"
            />
          </mask>
          <rect
            x="-1"
            y="0"
            width="1922"
            height="104"
            fill="#E8EEF8"
            mask="url(#mask)"
          />
        </svg>
      </div>
      <div className="our-team__section-inner">
        <div className="container">
          {multicolor_title?.value && (
            <div className="our-team__header">
              <div
                dangerouslySetInnerHTML={{ __html: multicolor_title.value }}
              />
              {description?.value && (
                <div
                  className="our-team__description"
                  dangerouslySetInnerHTML={{ __html: description.value }}
                />
              )}
            </div>
          )}
          {(team_members?.items || link?.items?.[0]) && (
            <div className="our-team__grid">
              {team_members?.items &&
                team_members.items.map(item => (
                  <OurTeamItem key={item?.id} data={item} />
                ))}
              {link?.items?.[0] && title?.value && (
                <OurTeamItem
                  discover={{
                    link: link.items[0],
                    icon: image?.items?.[0],
                    title: title.value,
                    subtitle: subtitle?.value,
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
