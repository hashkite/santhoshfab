/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';

import { Button, Person, Picture } from '../';
import { Icon } from '../svg';

import './horizontalTabsBlock.scss';

const HorizontalTabsBlock = ({ items }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="horizontal-tabs__block">
      {items && (
        <>
          <div className="horizontal-tabs__tabs">
            {items.map((item, index) => (
              <div
                className="horizontal-tabs__tab"
                key={item?.id}
                style={{ display: selectedTab === index ? 'block' : 'none' }}
              >
                <div className="container">
                  {item?.image?.items?.[0]?.src && (
                    <div className="horizontal-tabs__bg">
                      <Picture image={item.image.items[0]} />
                      {item?.two_items?.items && (
                        <div className="image__people">
                          {item.two_items.items.map(item => {
                            const { id } = item;

                            return <Person item={item} key={id} />;
                          })}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="horizontal-tabs__content">
                    {item?.title?.value && (
                      <div className="horizontal-tabs__subtitle">
                        {item.title.value}
                      </div>
                    )}
                    {item?.multicolor_title?.value && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.multicolor_title.value,
                        }}
                      />
                    )}
                    {item?.description?.value && (
                      <div
                        className="horizontal-tabs__description"
                        dangerouslySetInnerHTML={{
                          __html: item.description.value,
                        }}
                      />
                    )}
                    {item?.subtitle?.value && (
                      <div className="horizontal-tabs__links-subtitle">
                        {item.subtitle.value}
                      </div>
                    )}
                    {item?.links?.items && (
                      <div
                        className={`horizontal-tabs__links${
                          item.links.items.length > 4
                            ? ' --cols-3'
                            : item.links.items.length > 2
                            ? ' --cols-2'
                            : ''
                        }`}
                      >
                        {item.links.items.map((link, linkIndex) => (
                          <Button
                            data={link}
                            className="horizontal-tabs__link"
                            key={linkIndex}
                          >
                            <div className="icon">
                              <Icon
                                icon="arrow--long--right"
                                color="#5C00DB"
                                height="11px"
                                width="18px"
                              />
                            </div>
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="horizontal-tabs__nav">
            {items.map((item, index) => (
              <div
                className={`horizontal-tabs__nav-item${
                  selectedTab === index ? ' selected' : ''
                }`}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedTab(index)}
                key={index}
              >
                {item?.icon?.items?.[0]?.src && (
                  <div className="horizontal-tabs__nav-pic">
                    <Picture image={item.icon.items[0]} />
                  </div>
                )}
                {item?.title?.value && (
                  <div className="horizontal-tabs__nav-title">
                    {item.title.value}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
      <div className="horizontal-tabs__decor">
        <svg
          width="1920"
          height="168"
          viewBox="0 0 1920 168"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 157C253.652 59.4462 590.44 0 960 0C1329.56 0 1666.35 59.4462 1920 157V167.5H0V157Z"
            fill="#0F0C1E"
          />
        </svg>
      </div>
    </div>
  );
};

export default HorizontalTabsBlock;
