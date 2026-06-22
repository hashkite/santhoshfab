import React from 'react';
import Picture from '../picture';

const FootprintItem = ({ data }) => {
  const { title, description, image } = data || {};

  return (
    <div className="footprints__item">
      {(title?.value || description?.value) && (
        <div className="footprints__country">
          {image?.items?.[0]?.src && (
            <Picture className="flag" image={image.items[0]} />
          )}
          {title?.value && <div className="country">{title.value}</div>}
        </div>
      )}
      {description?.value && (
        <div
          dangerouslySetInnerHTML={{ __html: description.value }}
          className="footprints__address"
        />
      )}
    </div>
  );
};

export default FootprintItem;
