import React from 'react';

import './titleAndDescription.scss';

const TitleAndDescription = ({ data }) => {
  const { title, description } = data || {};

  return (
    <div className="title-description">
      <div className="container">
        {title?.value && <h2>{title?.value}</h2>}
        {description?.value && (
          <div dangerouslySetInnerHTML={{ __html: description.value }} />
        )}
      </div>
    </div>
  );
};

export default TitleAndDescription;
