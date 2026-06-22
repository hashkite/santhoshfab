import classNames from 'classnames';
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './style.scss';
import { CTAButtons } from 'components/elements';

gsap.registerPlugin(ScrollTrigger);

const MarketingMain = ({ data, Paragraphs }) => {
  const container = useRef(null);
  const {
    title,
    sub_title,
    description,
    sub_description,
    cta,
    title_alignment,
  } = data || {};

  // normalize nested paragraphs (accept different casing/shapes)
  const rawNested = data?.paragraphs ?? data?.Paragraphs ?? null;
  const nestedItems = Array.isArray(rawNested)
    ? rawNested
    : rawNested && Array.isArray(rawNested.items)
    ? rawNested.items
    : [];

  const alignmentClass = title_alignment?.value ?? '';

  // GSAP Animation on scroll
  useGSAP(
    () => {
      gsap.from(container.current, {
        opacity: 0,
        y: 30,
        ease: 'power1.out',
        duration: 0.8,
        scrollTrigger: {
          trigger: container.current,
          start: 'top bottom',
          end: 'center top',
        },
      });
    },
    { dependencies: [title, sub_title], scope: container }
  );

  return (
    <section
      className="marketing-main"
      ref={container}
      aria-label={`${data?.type ?? 'marketing_main'}`}
    >
      <div className="container">
        {title?.value && (
          <h2 className={classNames('marketing-main__title', alignmentClass)}>
            {title.value}
          </h2>
        )}

        {sub_title?.value && (
          <p className={classNames('marketing-main__sub-title', alignmentClass)}>
            {sub_title.value}
          </p>
        )}

        {description?.value && (
          <div
            className={classNames('marketing-main__description', alignmentClass)}
            dangerouslySetInnerHTML={{ __html: description.value }}
          />
        )}

        {Paragraphs && nestedItems.length > 0 && (
          <div className="marketing-main__nested">
            <Paragraphs paragraphs={{ items: nestedItems }} />
          </div>
        )}

        {sub_description?.value && (
          <div
            className={classNames(
              'marketing-main__sub-description',
              alignmentClass
            )}
            dangerouslySetInnerHTML={{ __html: sub_description.value }}
          />
        )}

        <CTAButtons items={cta?.items || []} variant="secondary" className="marketing-main__ctas" />
      </div>
    </section>
  );
};

export default MarketingMain;
