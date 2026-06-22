import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import './ppc_setup_process.scss';

const PPCSetupProcess = ({ data }) => {
  const { title, description, service_step, media_gallery } = data || {};
  const steps = service_step?.items || [];
  const images = media_gallery?.items || [];
  const [openIndex, setOpenIndex] = useState(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    if (containerRef.current) {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power1.out',
      });
    }
  }, { scope: containerRef, dependencies: [data] });

  return (
    <section className="ppc-setup-process" aria-label={title?.value || 'PPC Setup Process'}>
      <div className="ppc-setup-process__container container" ref={containerRef}>
        <div className="ppc-setup-process__left">
          {title?.value && (
            <h2 className="ppc-setup-process__title">{title.value}</h2>
          )}
          {description?.value && (
            <div
              className="ppc-setup-process__desc"
              dangerouslySetInnerHTML={{ __html: description.value }}
            />
          )}
          <div className="ppc-setup-process__steps" role="list">
            {steps.map((step, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  className={`ppc-setup-process__step${isOpen ? ' open' : ''}`}
                  key={step.id}
                  role="listitem"
                >
                  <button
                    className="ppc-setup-process__step-title"
                    aria-expanded={isOpen}
                    aria-controls={`ppc-step-desc-${idx}`}
                    id={`ppc-step-title-${idx}`}
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setOpenIndex(isOpen ? null : idx);
                      }
                    }}
                  >
                    <strong>{step.title?.value}</strong>
                    <span className="ppc-setup-process__step-toggle" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  <div
                    className={
                      `ppc-setup-process__step-desc${isOpen ? ' open' : ''}`
                    }
                    id={`ppc-step-desc-${idx}`}
                    role="region"
                    aria-labelledby={`ppc-step-title-${idx}`}
                    tabIndex={-1}
                    aria-hidden={!isOpen}
                    style={isOpen ? { maxHeight: 400 } : { maxHeight: 0 }}
                  >
                    {step.description?.value && (
                      <div
                        dangerouslySetInnerHTML={{ __html: step.description.value }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="ppc-setup-process__right">
          <div className="ppc-setup-process__images">
            {images[0] && (
              <img src={images[0].src} alt={images[0].alt || ''} className="ppc-setup-process__img main" />
            )}
            {images[1] && (
              <img src={images[1].src} alt={images[1].alt || ''} className="ppc-setup-process__img top" />
            )}
            {images[2] && (
              <img src={images[2].src} alt={images[2].alt || ''} className="ppc-setup-process__img bottom" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PPCSetupProcess;
