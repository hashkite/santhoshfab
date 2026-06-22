import React from 'react';
import Button from '../button';
import { Icon } from '../svg';
// import Person from '../person';
import Picture from '../picture';
import { getData } from '../../../shared/api';
import {
  abbreviateLastName,
  getRandomPeople,
  getShuffledCountries,
} from '../../../shared/utils';

const HeroCarouselItem = ({ data }) => {
  const {
    image,
    multicolor_title,
    description,
    link,
    display_people,
    display_countries,
  } = data || {};
  const { data: countries } = getData('fetch/terms/country');
  const { data: usersData } = getData('fetch/users-list');
  const users = usersData?.data;
  const people = getRandomPeople(users, 2);
  const shuffledCountries = getShuffledCountries(countries, 3);

  return (
    <div className="hero-carousel__item">
      <div className="container">
        <div className="hero-carousel__item-content">
          {multicolor_title?.value && (
            <div
              className="hero-carousel__item-title"
              dangerouslySetInnerHTML={{ __html: multicolor_title.value }}
            />
          )}
          {description?.value && (
            <div
              className="hero-carousel__item-description"
              dangerouslySetInnerHTML={{ __html: description.value }}
            />
          )}
          {link?.items?.[0] && (
            <div className="hero-carousel__item-buttons">
              <Button data={link.items[0]} className="btn btn-link">
                <div className="icon">
                  <Icon
                    icon="arrow--long--right"
                    color="#DD9A34"
                    height="11px"
                    width="22px"
                  />
                </div>
              </Button>
            </div>
          )}
        </div>

        <div className="hero-carousel__item-bg-wrapper">
          <div className="hero-carousel__item-bg">
            <Picture image={image.items[0]} />
            {display_countries?.value === '1' && shuffledCountries && (
              <div className="countries">
                {shuffledCountries?.map(el => (
                  <div key={el.name} className="country">
                    <Picture image={{ ...el.icon.items[0], alt: el.name }} />
                    <span>{el.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {display_people?.value === '1' && people.length > 0 && (
            <div className="hero-carousel__item-people">
              {people.map(item => {
                const { id } = item;

                return (
                  <div className="person" key={id}>
                    <div className="person__pic">
                      {item?.img?.[0]?.url && (
                        <Picture
                          image={{
                            ...item.img[0],
                            src: item.img[0].url,
                          }}
                        />
                      )}
                    </div>
                    <div className="person__cnt">
                      {item?.country && (
                        <div className="person__flag">
                          {item?.country?.image?.[0]?.url && (
                            <Picture
                              image={{
                                ...item.country.image[0],
                                src: item.country.image[0].url,
                              }}
                            />
                          )}
                          <span className="person__country">
                            {item.country.name}
                          </span>
                        </div>
                      )}
                      <div className="person__title">
                        {abbreviateLastName(item?.name)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* {two_items?.items?.length > 0 && (
            <div className="hero-carousel__item-people">
              {two_items.items.map(item => {
                const { id } = item;

                return <Person item={item} key={id} />;
              })}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default HeroCarouselItem;
