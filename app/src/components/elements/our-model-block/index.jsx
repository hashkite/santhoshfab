import React from 'react';
import { Icon, Decoration } from '../svg';
import Picture from '../picture';

import './ourModelBlock.scss';

const OurModelBlock = ({ items }) => {
  return (
    <div className="our-model__block">
      <div className="our-model__steps">
        {items.map((step, index) => (
          <div className="our-model__step" key={step?.id}>
            <div className="step__number">
              #{index >= 9 ? index + 1 : `0${index + 1}`}
            </div>
            {step?.icon?.items?.[0]?.src && (
              <div className="step__icon">
                <Picture image={step.icon.items[0]} />
              </div>
            )}
            {step?.description?.value && (
              <div
                className="step__description"
                dangerouslySetInnerHTML={{ __html: step.description.value }}
              />
            )}
            {step?.title?.value && (
              <div className="step__title">
                <h3>{step?.title?.value}</h3>
              </div>
            )}
            <div className="step__decoration">
              {items.length === index + 2 && (
                <>
                  <div
                    className={`decor --three-angles --yellow ${
                      items.length % 2 ? 'odd' : 'even'
                    }`}
                  >
                    <Icon
                      icon="angle--right"
                      height="17px"
                      width="10px"
                      color="#E6B975"
                    />
                    <Icon
                      icon="angle--right"
                      height="17px"
                      width="10px"
                      color="#DD9A34"
                    />
                    <Icon
                      icon="angle--right"
                      height="17px"
                      width="10px"
                      color="#FFC267"
                    />
                  </div>
                </>
              )}
              {items.length === index + 1 && (
                <div
                  className={`decor --curved-line --purple ${
                    items.length % 2 ? 'odd' : 'even'
                  }`}
                >
                  <Decoration
                    name="curved-line"
                    color="#5C00DB"
                    height="80px"
                    width="13px"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurModelBlock;
