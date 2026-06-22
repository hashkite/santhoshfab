
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './style.scss';

gsap.registerPlugin(ScrollTrigger);

const TechStack = ({ data }) => {
  const container = useRef(null);
  useGSAP(() => {
    if (!container.current) return;
    gsap.from(container.current, {
      opacity: 0,
      y: 40,
      ease: 'power1.out',
      duration: 0.8,
      scrollTrigger: {
        trigger: container.current,
        start: 'top bottom',
        end: 'center top',
        once: true,
      },
    });
  }, { scope: container });

  if (!data) return null;

  const title = data.title?.value || '';
  const subtitle = data.subtitle?.value || '';
  const description = data.description?.value || '';
  const cta = data.cta?.items?.[0] || null;
  const gallery = data.media_gallery?.items || [];

  // Always show 6 items: 5 icons + 1 'see more' button in the last cell
  const gridItems = [];
  for (let i = 0; i < 5; i++) {
    if (gallery.length > 0) {
      const item = gallery[i % gallery.length];
      gridItems.push(item);
    }
  }
  gridItems.push({ seeMore: true });

  return (
    <section ref={container} className="tech-stack-section">
      <div className="container">
        <div className="tech-stack__left">
          <div className="tech-stack__title">{title}</div>
          <div className="tech-stack__subtitle">{subtitle}</div>
          <div className="tech-stack__desc" dangerouslySetInnerHTML={{ __html: description }} />
          {cta && (
            <a href={cta.url || '#'} className="tech-stack__cta" target={cta.external ? '_blank' : undefined} rel={cta.external ? 'noopener noreferrer' : undefined}>
              {cta.title} <span className="tech-stack__cta-arrow">→</span>
            </a>
          )}
        </div>
        <div className="tech-stack__right">
          <div className="tech-stack__grid">
            {gridItems.map((item, idx) => (
              <div className={"tech-stack__grid-item" + (item.seeMore ? " tech-stack__grid-item--see-more" : "")} key={item.seeMore ? 'see-more' : (item.src || idx)}>
                {item.seeMore ? (
                  <button className="tech-stack__see-more-btn" type="button">and more...</button>
                ) : (
                  <div className="tech-stack__icon-wrap">
                    {item.svg ? (
                      <span
                        className="tech-stack__icon"
                        style={{ display: 'block', filter: 'inherit' }}
                        dangerouslySetInnerHTML={{ __html: item.svg }}
                      />
                    ) : (
                      <img
                        src={item.src}
                        alt={item.alt || item.name || ''}
                        className="tech-stack__icon"
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
