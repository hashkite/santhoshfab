import React from 'react';

import './developmentTeam.scss';
import { Picture } from '../../elements';

const DevelopmentTeam = ({ data }) => {
  const { description, multicolor_title, paragraphs } = data || {};

  return (
    <section className="development-team__section">
      {multicolor_title?.value && (
        <div className="development-team__top-section">
          <i className="development-team__line" />
          <div className="development-team__decor">
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
            <div className="development-team__header">
              <div
                className="development-team__title"
                dangerouslySetInnerHTML={{ __html: multicolor_title.value }}
              />
              {description?.value && (
                <div
                  className="development-team__desc"
                  dangerouslySetInnerHTML={{ __html: description.value }}
                />
              )}
            </div>
          </div>
        </div>
      )}
      {paragraphs?.items && (
        <div className="development-team__bottom-section">
          <div className="container">
            <div className="development-team__grid">
              {paragraphs.items.map((item, index) => (
                <div className="development-team__grid-item" key={item?.id}>
                  <div className="development-team__number purple">
                    #{index > 8 ? index + 1 : '0' + (index + 1)}
                  </div>
                  {item?.icon?.items?.[0]?.src && (
                    <div className="development-team__pic">
                      <Picture image={item.icon.items[0]} />
                    </div>
                  )}
                  {item?.title?.value && (
                    <div className="development-team__content">
                      <div className="development-team__title">
                        <h3>{item.title.value}</h3>
                      </div>
                      {item?.description?.value && (
                        <div
                          className="development-team__desc"
                          dangerouslySetInnerHTML={{
                            __html: item.description.value,
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DevelopmentTeam;
