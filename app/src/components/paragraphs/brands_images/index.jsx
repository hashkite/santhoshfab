import React from 'react';

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
              <img src={logo.src} alt={logo.alt || ''} />
            </div>
          ))}
        </div>
      </div>
    </section>
  </>;
};

export default BrandImages;
