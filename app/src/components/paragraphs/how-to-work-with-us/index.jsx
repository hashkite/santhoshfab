import React from 'react';

import { Button } from '../../elements';
import { Icon } from '../../elements/svg';

import './howToWorkWithUs.scss';

const HowToWorkWithUs = ({ data }) => {
  const { description, link, multicolor_title, paragraphs, title } = data || {};

  return (
    <section className="how-to-work-with-us__section">
      { paragraphs?.items && (
        <div className="how-to-work-with-us__top">
          <div className="container">
            { multicolor_title?.value && (
              <div className="how-to-work-with-us__header">
                <div
                  className="how-to-work-with-us__title"
                  dangerouslySetInnerHTML={ { __html: multicolor_title.value } }
                />
                { description?.value && (
                  <div
                    className="how-to-work-with-us__desc"
                    dangerouslySetInnerHTML={ { __html: description.value } }
                  />
                ) }
              </div>
            ) }
            <div className="how-to-work-with-us__list">
              { paragraphs.items.map((item, index) => (
                <React.Fragment key={ item?.id }>
                  { item?.title?.value && (
                    <div className="how-to-work-with-us__item">
                      <div className="how-to-work-with-us__item-number">
                        <span className="purple">{ index + 1 > 8 ? index + 1 : `0${index + 1}` }</span>
                      </div>
                      <div className="how-to-work-with-us__item-title">{ item.title.value }</div>
                      { item?.description?.value && (
                        <div
                          className="how-to-work-with-us__item-desc"
                          dangerouslySetInnerHTML={ { __html: item.description.value } }
                        />
                      ) }
                    </div>
                  ) }
                </React.Fragment>
              )) }
            </div>
          </div>
        </div>
      ) }
      { link?.items?.[ 0 ] && title?.value && (
        <div className="how-to-work-with-us__bottom">
          <div className="container">
            <div className="how-to-work-with-us__cta">
              <div className="how-to-work-with-us__cta-title">
                <h2>{ title.value }</h2>
              </div>
              <div className="how-to-work-with-us__cta-btn">
                <Button
                  data={ link.items[ 0 ] }
                  className="btn btn-primary"
                >
                  <div className="icon">
                    <Icon
                      icon="arrow--long--right"
                      height="11px"
                      width="18px"
                      color="#fff"
                    />
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) }
    </section>
  );
};

export default HowToWorkWithUs;