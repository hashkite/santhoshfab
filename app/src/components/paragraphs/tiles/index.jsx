import React from 'react';
import Tile from './tile';
import './tiles.scss';

const Tiles = ({ data }) => {
  const {
    multicolor_title,
    description,
    paragraphs,
    columns_layout,
    text_style,
  } = data || {};
  const layout =
    columns_layout?.value === '6'
      ? 'cols-two'
      : columns_layout?.value === '3'
      ? 'cols-four'
      : 'cols-one';

  return (
    <div className={`tiles__section ${layout}`}>
      {multicolor_title?.value && (
        <div className="tiles__top-section">
          <div className="tiles__decor">
            <svg
              width="1920"
              height="83"
              viewBox="0 0 1920 83"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0H1920V83C1920 83 1524.5 3 960 3C395.5 3 0 83 0 83V0Z"
                fill="#E8EEF8"
              />
            </svg>
          </div>
          <div className="container">
            <div
              className={`tiles__header text-center${
                text_style?.value ? ' --type-' + text_style.value : ''
              }`}
            >
              {multicolor_title?.value && (
                <div
                  className="tiles__title"
                  dangerouslySetInnerHTML={{ __html: multicolor_title.value }}
                />
              )}
              {description?.value && (
                <div
                  className="tiles__description"
                  dangerouslySetInnerHTML={{ __html: description.value }}
                />
              )}
            </div>
          </div>
        </div>
      )}
      {paragraphs?.items?.length > 0 && (
        <div className="tiles__bottom-section">
          <div className="container">
            <div className="tiles__row">
              {paragraphs.items.map((p, index) => (
                <Tile key={p.id} data={p} type={layout} index={index} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tiles;
