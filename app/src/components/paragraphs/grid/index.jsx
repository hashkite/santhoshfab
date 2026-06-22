import React from 'react';

import './grid.scss';

import { Button, Picture } from '../../elements';
import { Icon } from '../../elements/svg';

const Grid = ({ data }) => {
  const { multicolor_title: title, eyebrow, columns_desktop, paragraphs } = data || {};
  console.log('Grid data:', columns_desktop);
  return (
    <section className="grid__section">
      <div className="container">
        {eyebrow?.value && (
          <div className="grid__eyebrow">
            <span dangerouslySetInnerHTML={{ __html: eyebrow.value }} />
          </div>
        )}
        {title?.value && (
          <div className="grid__header">
            <div
              className="grid__title"
              dangerouslySetInnerHTML={{ __html: title.value }}
            />
          </div>
        )}
        {paragraphs?.items && (
          <div className={`grid__list grid--columns-desktop--${columns_desktop.value || 3}`}>
            {paragraphs.items.map(item => (
              <div className="grid__item" key={item?.id}>
                {item?.image?.items?.[0]?.src && (
                  <div className="grid__item-icon">
                    <Picture image={item.image.items[0]} />
                  </div>
                )}
                {item?.multicolor_title?.value && (
                  <div className="grid__item-content">
                    <div
                      className="grid__item-title"
                      dangerouslySetInnerHTML={{
                        __html: item.multicolor_title.value,
                      }}
                    />
                    {item?.description?.value && (
                      <div
                        className="grid__item-desc"
                        dangerouslySetInnerHTML={{
                          __html: item.description.value,
                        }}
                      />
                    )}
                    {item?.link?.items?.[0] && (
                      <div className="grid__item-button">
                        <Button
                          data={item.link.items[0]}
                          className="btn btn-m btn-link"
                        >
                          <div className="icon">
                            <Icon
                              icon="arrow--long--right"
                              color="#5C00DB"
                              height="11px"
                              width="22px"
                            />
                          </div>
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Grid;
