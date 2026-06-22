import React from 'react';
import { Button, Picture } from '../';
import { Icon } from '../svg';
import { getData } from '../../../shared/api';
import { getRandomPeople } from '../../../shared/utils';

import './businessNeedsItem.scss';

const BusinessNeedsItem = ({ data, i }) => {
  const {
    description,
    teaser_text,
    image,
    link,
    title,
    title_icon_color,
    url,
  } = data || {};
  const { data: usersData } = getData('fetch/users-list');
  const users = usersData?.data;
  const people = getRandomPeople(users, 3);

  return (
    <div
      className={`business-needs__item${
        title_icon_color?.value ? ' --color-' + title_icon_color.value : ''
      }`}
    >
      {image?.items?.[0]?.src && (
        <Picture className="business-needs__pic" image={image.items[0]} />
      )}
      {(i === 1 && people.length > 0 && (
        <div className="business-needs__people">
          {people.map(el => (
            <Picture key={el.id} image={{ ...el.img[0], src: el.img[0].url }} />
          ))}
        </div>
      )) ||
        ''}
      {(title || description || link || teaser_text) && (
        <div className="business-needs__cnt">
          {(title?.value && <h3>{title.value}</h3>) ||
            (title && typeof title === 'string' && <h3>{title}</h3>)}
          {(description?.value || teaser_text?.value) && (
            <div
              className="business-needs__desc"
              dangerouslySetInnerHTML={{
                __html: description?.value || teaser_text?.value,
              }}
            />
          )}
          {(link?.items?.[0] && (
            <div className="business-needs__button">
              <Button
                className={`btn btn-${
                  title_icon_color?.value === 'yellow' ? 'secondary' : 'primary'
                }`}
                data={link.items[0]}
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
            </div>
          )) ||
            (url && (
              <div className="business-needs__button">
                <Button
                  className={`btn btn-${i % 2 ? 'primary' : 'secondary'}`}
                  data={{ url, title: 'Discover' }}
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
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default BusinessNeedsItem;
