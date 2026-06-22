import { Link } from 'react-router-dom';

import { Picture } from '../../elements';
import { Icon } from '../../elements/svg';

const Item = ({ multicolor_title, description, image, link, type, index }) => {
  return (
    <Link
      className="tile__block"
      target={link?.items[0]?.target}
      to={link?.items[0]?.url}
    >
      <div className="tile__image">
        {image?.items?.[0]?.src && <Picture image={image.items[0]} />}
      </div>
      <div className="tile__content">
        {multicolor_title?.value && (
          <div
            className="tile__title"
            dangerouslySetInnerHTML={{ __html: multicolor_title.value }}
          />
        )}
        {description?.value && (
          <div
            className="tile__description"
            dangerouslySetInnerHTML={{ __html: description.value }}
          />
        )}
      </div>
      {link?.items[0]?.url && type !== 'cols-four' && (
        <div className="tile__button">
          <a
            href={link.items[0].url}
            target={link.items[0].target}
            className={`btn ${
              index % 2 === 0 ? 'btn-secondary' : 'btn-primary'
            }`}
          >
            <div className="icon">
              <Icon
                icon="arrow--long--right"
                color="#fff"
                height="11px"
                width="18px"
              />
            </div>
            <span>{link.items[0].title || 'Learn more'}</span>
          </a>
        </div>
      )}
    </Link>
  );
};

export default Item;
