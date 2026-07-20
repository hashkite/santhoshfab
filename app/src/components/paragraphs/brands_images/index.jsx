import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import './style.scss';

const BrandImages = ({ data }) => {
  console.log('BrandImages data:', data);
  const { brand_logos, heading } = data || {};
  return <>
    <section
      className="brand-images"
      aria-label={data?.type || 'brand_images'}>
      <div className="container">
        {heading?.value && (
          <h2 className="brand-images__heading">{heading.value}</h2>
        )}
        <div className="brand-images__logos">
          {brand_logos?.items?.map((logo, idx) => (
            <div className="brand-images__logo" key={idx}>
              <LazyLoadImage
                src={logo.src}
                srcSet={logo.webp}
                alt={logo.alt || ''}
                effect="blur"
                onError={(e) => {
                  if (e.target.srcset) {
                    e.target.srcset = '';
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  </>;
};

export default BrandImages;
