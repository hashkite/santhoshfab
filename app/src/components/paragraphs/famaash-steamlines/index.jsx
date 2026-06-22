import React from 'react';

import './famaashStreamlines.scss';
import { Picture } from '../../elements';

const FamaashStreamlines = ({ data }) => {
  const { background_image, description, image, multicolor_title, top_title } =
    data || {};

  return (
    <section className="famaash-streamlines__section">
      <div className="container">
        {multicolor_title?.value && (
          <div className="famaash-streamlines__content">
            {top_title?.value && (
              <div className="famaash-streamlines__suptitle">
                {top_title.value}
              </div>
            )}
            <div
              className="famaash-streamlines__title"
              dangerouslySetInnerHTML={{ __html: multicolor_title.value }}
            />
            {description?.value && (
              <div
                className="famaash-streamlines__description"
                dangerouslySetInnerHTML={{ __html: description.value }}
              />
            )}
          </div>
        )}
        {background_image?.items?.[0]?.src && (
          <div className="famaash-streamlines__pic">
            <Picture image={background_image.items[0]} />
            <Picture image={image.items[0]} className="pic-small" />
          </div>
        )}
      </div>
      <i className="famaash-streamlines__line" />
      <div className="famaash-streamlines__decor">
        <svg
          width="1920"
          height="83"
          viewBox="0 0 1920 83"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 83H1920V0C1920 0 1524.5 80 960 80C395.5 80 0 0 0 0V83Z"
            fill="#E8EEF8"
          />
        </svg>
      </div>
    </section>
  );
};

export default FamaashStreamlines;
