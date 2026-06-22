import React from 'react';

import Webform from '../webform';

import './webform.scss';

const WebformSection = ({ data }) => {
  const { title, multicolor_title, description, webform, style } = data || {};

  return (
    <div
      className={`webform__section${
        style?.value ? ' --type-' + style.value : ''
      }`}
    >
      <div className="container">
        {multicolor_title && description && (
          <div className="webform__content">
            {multicolor_title?.value && (
              <div
                dangerouslySetInnerHTML={{ __html: multicolor_title.value }}
              />
            )}
            {description?.value && (
              <div
                className="webform__description"
                dangerouslySetInnerHTML={{ __html: description.value }}
              />
            )}
          </div>
        )}
        {webform && (
          <div className="webform__form-wrapper">
            <div className="webform__form-block">
              {title?.value && <h3>{title?.value}</h3>}
              <Webform data={webform} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebformSection;
