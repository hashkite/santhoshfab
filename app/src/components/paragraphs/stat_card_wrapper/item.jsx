import React from 'react';

export const StatCardWrapperItem = ({ title, review_text, image, stat_items }) => {
  return (
    <div className="stat-card">
      {image?.items?.[0] && (
        <div className="stat-card__image">
          <img src={image.items[0].src} alt={image.items[0].alt || ''} />
        </div>
      )}
      <div className="stat-card__detail">
        {title?.value && (
          <h2 className="stat-card__title">{title.value}</h2>
        )}
        {stat_items?.items?.length > 0 && (
          <div className="stat-card__stats container">
            {stat_items.items.map((item, idx) => (
              <div className="stat-card__stat" key={idx}>
                <span className="stat">{item.stat.value}</span>
                <span className="stat-label">{item.title.value}</span>
              </div>
            ))}
          </div>
        )}
        {review_text?.value && (
          <>
            <p className="stat-card__from-client">From the Client:</p>
            <blockquote className="stat-card__review">
              {review_text.value}
            </blockquote>
          </>
        )}
      </div>
    </div>
  );
};
