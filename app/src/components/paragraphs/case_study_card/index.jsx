import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import './style.scss';

const CaseStudyCard = ({ data }) => {
  const cardRef = useRef(null);
  useGSAP(
    () => {
      if (cardRef.current) {
        gsap.from(cardRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power1.out',
        });
      }
    },
    { scope: cardRef, dependencies: [data] }
  );

  if (!data) return null;
  const { image, title, description, cta, related } = data;
  const imgObj = image?.items?.[0];
  const ctaItem = cta?.items?.[0];
  const relatedItems = related?.items || [];

  return (
    <section className="case-study-card-section" aria-label="case_study_card">
      <div className="container">
        <div className="case-study-card" ref={cardRef}>
          {imgObj && (
            <div className="case-study-card__image">
              <img src={imgObj.src} alt={imgObj.alt || ''} />
            </div>
          )}
          <div className="case-study-card__main">
            {title?.value && (
              <div className="case-study-card__title">{title.value}</div>
            )}
            {description?.value && (
              <div
                className="case-study-card__desc"
                dangerouslySetInnerHTML={{ __html: description.value }}
              />
            )}
            {ctaItem && (
              <a
                className="case-study-card__cta"
                href={ctaItem.url}
                target={ctaItem.external ? '_blank' : undefined}
                rel={ctaItem.external ? 'noopener noreferrer' : undefined}
              >
                {ctaItem.title || 'View Case Study'}
              </a>
            )}
          </div>
          {relatedItems.length > 0 && (
            <div className="case-study-card__related">
              <h4>{related?.label || 'Related Articles:'}</h4>
              <ul>
                {relatedItems.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={item.url}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CaseStudyCard;
