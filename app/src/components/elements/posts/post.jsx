import React from 'react';
import { Link } from 'react-router-dom';

import { Icon } from '../svg/';
import Picture from '../picture';

const Post = ({ data, type }) => {
  const { image, tags, title, teaser_text, url } = data || {};

  return (
    <Link to={url} className="posts__item">
      {image?.items?.[0]?.src && (
        <div className="posts__item-pic">
          <Picture image={image.items[0]} />
        </div>
      )}
      <div className="posts__item-content">
        {tags?.items && (
          <div className="posts__item-tags">
            {tags.items.map(item => (
              <div
                key={item?.id}
                className="posts__item-tag"
                dangerouslySetInnerHTML={{ __html: item?.description?.value }}
              />
            ))}
          </div>
        )}
        {title && (
          <div className="posts__item-title">
            <h3
              className={
                type === 'case-studies' || type === 'insights-all'
                  ? 'decorated'
                  : ''
              }
            >
              {title}
            </h3>
            <div className="posts__item-icon">
              <Icon
                icon="arrow--long--right"
                color="#5C00DB"
                height="11px"
                width="23px"
              />
            </div>
          </div>
        )}
        {(type === 'case-studies' || type === 'insights-all') &&
          teaser_text?.value && (
            <div
              className="posts__item-description"
              dangerouslySetInnerHTML={{ __html: teaser_text.value }}
            />
          )}
      </div>
    </Link>
  );
};

export default Post;
