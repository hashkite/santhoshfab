import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mapper } from 'shared/ui';
import { MarketingCardItem } from './item';
import './style.scss';

gsap.registerPlugin(ScrollTrigger);

const MarketingCardsWrapper = ({ data }) => {
  const container = useRef(null);
  const cards = data?.marketing_cards_wrapper?.items || [];

  console.log(cards,'cards in marketing cards wrapper');
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
    { dependencies: [cards], scope: container }
  );

  return (
    <section
      className="marketing-cards-wrapper"
      ref={container}
      aria-label={data?.type || 'marketing_cards'}
    >
      {cards.length > 0 ? (
        <Mapper
          className="marketing-cards-wrapper__items"
          array={{ items: cards }}>
          {(item) => <MarketingCardItem {...item} />}
        </Mapper>
      ) : (
        <div className="marketing-cards-wrapper__empty">
          No marketing cards available
        </div>
      )}
    </section>
  );
};

export default MarketingCardsWrapper;
