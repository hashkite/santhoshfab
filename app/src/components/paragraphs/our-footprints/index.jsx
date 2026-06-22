import React from 'react';
import { FootprintsCarousel, Picture } from '../../elements';
import './ourFootprints.scss';

const OurFootprints = ({ data }) => {
  const { description, link, media, multicolor_title, top_title, tags } =
    data || {};

  return (
    <div className="our-footprints__section">
      <div className="our-footprints__decor our-footprints__decor-bottom">
        <svg
          width="1920"
          height="160"
          viewBox="0 0 1920 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.71267e-05 160H1920C1920 160 1920 160 1920 0.000183105C1320.5 220.5 531.5 201 2.71267e-05 0.000183105C-3.39084e-05 160 2.71267e-05 160 2.71267e-05 160Z"
            fill="#F8FBFF"
          />
        </svg>
      </div>
      {media?.items?.[0]?.src && media.items[0]?.type === 'image' && (
        <Picture image={media.items[0]} className="our-footprints__main-bg" />
      )}
      {media?.items?.[0] && media.items[0]?.type === 'video' && (
        <video
          src={media.items[0]?.src}
          loop
          autoPlay
          playsInline
          muted
          className="our-footprints__main-bg"
        />
      )}
      <div className="container">
        <div className="our-footprints__top-content">
          {top_title?.value && (
            <div className="our-footprints__subtitle">{top_title.value}</div>
          )}
          {multicolor_title?.value && (
            <div dangerouslySetInnerHTML={{ __html: multicolor_title.value }} />
          )}
        </div>
        {tags?.items && (
          <div className="our-footprints__countries">
            <FootprintsCarousel items={tags.items} />
          </div>
        )}
        {(description?.value || link?.items?.[0]) && (
          <div className="our-footprints__bottom-content">
            {description?.value && (
              <div
                className="our-footprints__description"
                dangerouslySetInnerHTML={{ __html: description.value }}
              />
            )}
            {/* {link?.items?.[0] && (
              <div className="our-footprints__button">
                <Button
                  data={link.items[0]}
                  className="btn btn-m btn-gray-border-3"
                >
                  <div className="icon">
                    <Icon
                      icon="arrow--right"
                      color="#DD9A34"
                      height="11px"
                      width="18px"
                    />
                  </div>
                </Button>
              </div>
            )} */}
          </div>
        )}
      </div>
    </div>
  );
};

export default OurFootprints;
