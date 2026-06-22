import React from 'react';
import Picture from '../picture';

const ClientImpactCarouselItem = ({ data }) => {
  const { description, image, title, top_title, logo } = data || {};

  return (
    <div className="client-impact-carousel__item">
      {(title?.value || image?.items?.[0]) && (
        <div className="item__header">
          {image?.items?.[0]?.src && (
            <div className="author__pic">
              <Picture image={image.items[0]} />
            </div>
          )}
          {title?.value && (
            <div className="author__content">
              {logo?.items?.[0]?.src && (
                <div className="logo">
                  <Picture image={logo.items[0]} />
                </div>
              )}
              {title?.value && <div className="name">{title.value}</div>}
            </div>
          )}
        </div>
      )}
      <div className="item__content">
        {top_title?.value && <h3>{top_title.value}</h3>}
        {description?.value && (
          <div
            className="item__description"
            dangerouslySetInnerHTML={{ __html: description.value }}
          />
        )}
      </div>
    </div>
  );
};

export default ClientImpactCarouselItem;
