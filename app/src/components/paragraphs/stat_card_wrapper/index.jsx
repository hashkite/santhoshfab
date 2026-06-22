import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './style.scss';
import { Mapper } from 'shared/ui';
import { StatCardWrapperItem } from './item';

gsap.registerPlugin(ScrollTrigger);

const StatCardsWrapper = ({ data }) => {
  const container = useRef(null);
  const cards = data?.stat_card_wrapper?.items || [];

  // GSAP Animation on scroll
  useGSAP(
    () => {
      gsap.from(container.current, {
        opacity: 0,
        y: 40,
        ease: 'power1.out',
        duration: 0.8,
        scrollTrigger: {
          trigger: container.current,
          start: 'top bottom',
          end: 'center top',
        },
      });
    },
    { dependencies: [cards], scope: container }
  );

  return (
    <section
      className="stat-cards-wrapper"
      ref={container}
      aria-label={data?.type || 'stat_card_wrapper'}
    >
      {cards.length > 0 ? (
        <Mapper
          className="stat-cards-wrapper__items"
          array={{ items: cards }}>
          {(item) => <StatCardWrapperItem {...item} />}
        </Mapper>
      ) : (
        <div className="stat-cards-wrapper__empty">
          No stat cards available
        </div>
      )}
    </section>
  );
};

export default StatCardsWrapper;