import classNames from 'classnames';
import { useState } from 'react';
import { HtmlField, Mapper } from 'shared/ui';
import { LocationsItem } from './item';
import './style.scss';

const Locations = ({ data }) => {
  const { multicolor_title, description, paragraphs } = data;
  const [active, setActive] = useState(null);

  const allLocations =
    paragraphs?.items?.flatMap(({ tags }) => tags.items) || [];
  const tags =
    (active
      ? paragraphs?.items?.find(({ id }) => id === active)?.tags
      : allLocations) || {};

  const handleClick = id => setActive(id);
  return (
    <div aria-label="locations" className="locations">
      <div className="container">
        <HtmlField text={multicolor_title} Tag="h2" />
        <HtmlField text={description} Tag="p" />

        <div className="locations__content">
          <div className="locations__buttons">
            {paragraphs?.items?.map(({ id, title }) => (
              <button
                key={id}
                onClick={() => handleClick(active === id ? null : id)}
                className={classNames('people-item__name', {
                  active: active === id,
                })}
              >
                <HtmlField text={title} Tag={'span'} />
              </button>
            ))}
          </div>
          <Mapper
            className={'locations__items'}
            array={tags}
            children={LocationsItem}
          />
        </div>
      </div>
    </div>
  );
};

export default Locations;
