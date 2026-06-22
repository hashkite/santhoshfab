import React from 'react';
import './famaashProductions.scss';

const FamaashProductions = ({ data }) => {
  const { video, multicolor_title, title, paragraphs } = data || {};

  return (
    <section className="famaash-productions__section">
      <div className="famaash-productions__top">
        {video?.items?.[0]?.src && (
          <video src={video?.items?.[0]?.src} autoPlay muted loop />
        )}
        <div className="container">
          {title?.value && (
            <h1 dangerouslySetInnerHTML={{ __html: title.value }} />
          )}
        </div>
        <div className="famaash-productions__top-decor">
          <svg
            width="1921"
            height="93"
            viewBox="0 0 1921 93"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M954 0.998901C1532.5 -3.99999 1921 73 1921 73V92.5H0V72.9979C0 72.9979 375.5 5.99779 954 0.998901Z"
              fill="#fff"
            />
          </svg>
        </div>
      </div>
      <div className="famaash-productions__bottom">
        {(multicolor_title?.value || paragraphs?.items?.[0].length > 0) && (
          <>
            <div className="lines" />
            <div className="container">
              <div className="famaash-productions__bottom-inner">
                <div className="famaash-productions__content">
                  <div
                    dangerouslySetInnerHTML={{ __html: multicolor_title.value }}
                  />

                  {paragraphs?.items?.[0] && (
                    <div className="famaash-productions__items">
                      {paragraphs.items.map(p => {
                        const { id, title, subtitle, image } = p;
                        const { svg } = image?.items?.[0] || {};

                        return (
                          <div className="famaash-productions__item" key={id}>
                            <div
                              className="svg"
                              dangerouslySetInnerHTML={{ __html: svg }}
                            />
                            <div className="content">
                              {title?.value && <h3>{title.value}</h3>}
                              {subtitle?.value && (
                                <div
                                  className="text"
                                  dangerouslySetInnerHTML={{
                                    __html: subtitle.value,
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="famaash-productions__decor">
        <svg
          width="1920"
          height="104"
          viewBox="0 0 1920 104"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask id="mask" x="0" y="0" width="100%" height="100%">
            <rect x="-1" y="0" width="1922" height="104" fill="white" />
            <path
              d="M0 -3.09944e-06C0 -3.09944e-06 583.861 104 960 104C1336.14 104 1920 -3.09944e-06 1920 -3.09944e-06H0Z"
              fill="black"
            />
          </mask>
          <rect
            x="-1"
            y="0"
            width="1922"
            height="104"
            fill="#171A1E"
            mask="url(#mask)"
          />
        </svg>
      </div>
    </section>
  );
};

export default FamaashProductions;
