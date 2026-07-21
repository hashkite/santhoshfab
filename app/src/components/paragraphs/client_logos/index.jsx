import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import './style.scss';

const ClientLogos = ({ data }) => {
  const { brand_logos, heading } = data || {};
  return <>
    <section
      className="client-logos"
      aria-label={data?.type || 'client_logos'}>
      <div className="container">
        {heading?.value && (
          <h2 className="client-logos__heading">{heading.value}</h2>
        )}
        <div className="client-logos__logos">
          {brand_logos?.items?.map((logo, idx) => (
            <div className="client-logos__logo" key={idx}>
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

export default ClientLogos;
