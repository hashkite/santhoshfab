import React from 'react';

import { Icon } from '../svg';

import './scrollableItemImages.scss';
import Person from '../person';
import Picture from '../picture';

const ScrollableItemImages = ({ data }) => {
  const { paragraph } = data || {};
  const { image, two_items, background_image, two_paragraphs, logos, type } =
    paragraph?.items?.[0] || {};

  return (
    <div className={`scrollable-item__image${type ? ' --type-' + type : ''}`}>
      <div className="scrollable-item__image-inner">
        {two_paragraphs?.items && (
          <div className="image__two-paragraphs">
            {two_paragraphs.items.map(item => (
              <div
                className={`two-paragraphs__item${
                  item?.title_icon_color?.value
                    ? ' --color-' + item.title_icon_color?.value
                    : ''
                }`}
                key={item?.id}
              >
                <div className="icon">
                  <Icon icon="check" color="#fff" height="6px" width="8px" />
                </div>
                <div className="text">{item?.title?.value}</div>
              </div>
            ))}
          </div>
        )}
        {logos?.items && (
          <div className="image__logos">
            {logos.items.map((item, index) => (
              <Picture image={item} key={index} />
            ))}
          </div>
        )}
        {type === 'image_with_background' && (
          <div className="image__decor-code">
            <svg
              width="200"
              height="129"
              viewBox="0 0 200 129"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_3124_12979)">
                <path
                  d="M144.546 10.5391H55.6943C44.6324 10.5391 35.6465 19.4953 35.6465 30.5869C35.6465 41.6785 44.6027 50.6348 55.6943 50.6348H121.384L134.789 68.6067V50.6348H144.546C155.608 50.6348 164.594 41.6488 164.594 30.5869C164.594 19.525 155.637 10.5391 144.546 10.5391Z"
                  fill="url(#paint0_linear_3124_12979)"
                />
                <path
                  d="M124.49 30.831V29.4705L113.538 23.8925V26.0693L121.939 30.1168L121.871 29.9807V30.3208L121.939 30.1848L113.538 34.2323V36.409L124.49 30.831Z"
                  fill="#F8FBFF"
                />
                <path
                  d="M96.3937 18.7227L102.006 39.5722H103.842L98.2304 18.7227H96.3937Z"
                  fill="#F8FBFF"
                />
                <path
                  d="M75.7504 30.831L86.7024 36.409V34.2323L78.3013 30.1848L78.3693 30.3208V29.9807L78.3013 30.1168L86.7024 26.0693V23.8925L75.7504 29.4705V30.831Z"
                  fill="#F8FBFF"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_3124_12979"
                  x="0.646484"
                  y="0.539062"
                  width="198.947"
                  height="128.066"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="25" />
                  <feGaussianBlur stdDeviation="17.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_3124_12979"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_3124_12979"
                    result="shape"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_3124_12979"
                  x1="166.001"
                  y1="53.4199"
                  x2="37.3357"
                  y2="53.4199"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#DD9A34" />
                  <stop offset="1" stopColor="#FFD392" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        )}
        {background_image?.items?.[0]?.src && (
          <div className="image__bg-image">
            <Picture image={background_image.items[0]} />
          </div>
        )}
        {image?.items?.[0]?.src && (
          <div className="image__bg">
            <Picture image={image.items[0]} />
          </div>
        )}
        {two_items?.items && (
          <div className="image__people">
            {two_items.items.map(item => {
              const { id } = item;

              return <Person item={item} key={id} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScrollableItemImages;
