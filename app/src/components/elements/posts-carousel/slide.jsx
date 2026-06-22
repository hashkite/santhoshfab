import React from 'react';
import { Link } from 'react-router-dom';
import Picture from '../picture';

const Slide = ({ data }) => {
  const { image, tags, teaser_text, title, url } = data || {};

  const fixedTeaserText = teaser_text?.value
    ? teaser_text.value.length > 150
      ? teaser_text.value.substring(0, 150) + '...'
      : teaser_text.value
    : null;

  return (
    <Link to={url} className="posts-carousel__slide">
      {image?.items?.[0]?.src && (
        <div className="posts-carousel__slide-pic">
          <Picture image={image.items[0]} />
        </div>
      )}
      <div className="posts-carousel__slide-content">
        {tags?.items && (
          <div className="posts-carousel__slide-tags">
            {tags.items.map(item => (
              <div
                key={item?.id}
                className="posts-carousel__slide-tag"
                dangerouslySetInnerHTML={{ __html: item?.description?.value }}
              />
            ))}
          </div>
        )}
        {title && (
          <div className="posts-carousel__slide-title">
            <h3 className="decorated">{title}</h3>
          </div>
        )}
        {fixedTeaserText && (
          <div
            className="posts-carousel__slide-text"
            dangerouslySetInnerHTML={{ __html: fixedTeaserText }}
          />
        )}
      </div>
    </Link>
  );
};

export default Slide;
