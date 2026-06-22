import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HtmlField } from 'shared/ui';

import './style.scss';

gsap.registerPlugin(ScrollTrigger);

const Awards = ({ data }) => {
  const {
    awards_items,
    cta,
    description,
    industry_sector,
    multicolor_title,
    project_delivered,
    title,
  } = data || {};

  const items = awards_items?.items || [];
  const container = useRef(null);

  useGSAP(() => {
    if (!container.current) return;

    // reveal left column
    if (document.querySelectorAll('.awards__left').length > 0) {
      gsap.from('.awards__left', {
        scrollTrigger: {
          trigger: container.current,
          once: true,
          start: 'top bottom',
        },
        x: -40,
        opacity: 0,
        duration: 0.6,
      });
    }

    // reveal right awards
    if (document.querySelectorAll('.awards__right .award-item').length > 0) {
      gsap.from('.awards__right .award-item', {
        scrollTrigger: {
          trigger: container.current,
          once: true,
          start: 'top bottom',
        },
        y: 24,
        opacity: 0,
        stagger: 0.12,
      });
    }

    // rotors: slow continuous rotation (both delivered and sector)
    // Only rotate the SVG, not the static center text
    const deliveredSVG = container.current.querySelector('.awards__rotor--delivered svg');
    const sectorSVG = container.current.querySelector('.awards__rotor--sector svg');
    [deliveredSVG, sectorSVG].forEach((svg) => {
      if (svg) {
        gsap.to(svg, {
          rotation: 360,
          transformOrigin: '50% 50%',
          repeat: -1,
          ease: 'linear',
          duration: 28,
        });
      }
    });

    // stat pop
    gsap.from('.awards__stat-number', {
      scrollTrigger: {
        trigger: container.current,
        once: true,
        start: 'top bottom',
      },
      scale: 0.9,
      opacity: 0,
      duration: 0.6,
    });
  }, { scope: container });

  // build separate rotating texts for each SVG rotator
  const deliveredText = `projects executed successfully • `;
  const deliveredTextRepeat = deliveredText.repeat(8);
  const sectorText = `industry sector • `;
  const sectorTextRepeat = sectorText.repeat(10);

  const ctaItem = cta?.items?.[0] || null;

  return (
    <div ref={container} className="awards">
      <div className="container">
        <div className="awards__grid">
          <div className="awards__left">
            {title && <HtmlField text={title} Tag="span" className="awards__label" />}
            {multicolor_title && (
              <div className="awards__multicolor">
                <HtmlField text={multicolor_title} className="awards__title" />
              </div>
            )}

            {description && (
              <HtmlField text={description} Tag="p" className="awards__description" />
            )}

            {ctaItem && (
              <div className="awards__cta">
                <a href={ctaItem.url || '#'} className="link-cta">{ctaItem.title} <span className="link-cta__arrow">→</span></a>
              </div>
            )}
          </div>

          <div className="awards__middle">
            {/* First rotator: projects delivered */}
            <div className="awards__rotor awards__rotor--delivered" aria-hidden>
              <svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <path id="awardsCircleDelivered" d="M110,20a90,90 0 1,1 0,180a90,90 0 1,1 0,-180" />
                </defs>
                <text fontSize="22" style={{ lineHeight: 1.5 }} fill="currentColor">
                  <textPath href="#awardsCircleDelivered" startOffset="0">{deliveredTextRepeat}</textPath>
                </text>
              </svg>
              <div className="awards__rotor-center">
                <span className="awards__rotor-number">{project_delivered?.value || '0'}+</span>
                <span className="awards__rotor-label">project delivered</span>
              </div>
            </div>

            {/* Second rotator: industry sector */}
            <div className="awards__rotor awards__rotor--sector" aria-hidden>
              <svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <path id="awardsCircleSector" d="M110,20a90,90 0 1,1 0,180a90,90 0 1,1 0,-180" />
                </defs>
                <text fontSize="22" style={{ lineHeight: 1.5 }} fill="currentColor">
                  <textPath href="#awardsCircleSector" startOffset="0">{sectorTextRepeat}</textPath>
                </text>
              </svg>
              <div className="awards__rotor-center">
                <span className="awards__rotor-number">{industry_sector?.value || '0'}+</span>
                <span className="awards__rotor-label">industry sector</span>
              </div>
            </div>
          </div>

          <div className="awards__right">
            <div className="awards__list">
              {items.map((item) => {
                const img = item.image?.items?.[0] || null;
                return (
                  <div className="award-item" key={item.id || item.internal_id}>
                    {img && <img src={img.src} alt={img.alt || img.name || 'award'} />}
                    {item.title && <HtmlField text={item.title} Tag="div" className="award-item__title" />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* CTA Card at the bottom */}
        <div className="awards__cta-card">
          <div className="awards__cta-card-content">
            <div className="awards__cta-card-text">
              <div className="awards__cta-card-title">Ready to find out more?</div>
              <div className="awards__cta-card-desc">Book a discovery call to discuss your needs.</div>
            </div>
            <button type="button" className="awards__cta-card-btn">Schedule a Call</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Awards;
