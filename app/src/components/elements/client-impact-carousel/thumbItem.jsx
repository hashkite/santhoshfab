import React from 'react';
import Picture from '../picture';

const ClientImpactCarouselThumbItem = ({ data }) => {
  const { image, title } = data || {};

  return (
    <div className="client-impact-carousel__thumb-item">
      {title?.value && (
        <div className="author__content">
          {title?.value && <div className="name">{title.value}</div>}
          <div className="company">McKinsey & Company</div>
        </div>
      )}
      {image?.items?.[0]?.src && (
        <div className="author__pic">
          <Picture image={image.items[0]} />
        </div>
      )}
    </div>
  );
};

export default ClientImpactCarouselThumbItem;
