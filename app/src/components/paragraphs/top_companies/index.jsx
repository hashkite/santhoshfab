import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useRef } from 'react';
import { HtmlField, Mapper } from 'shared/ui';
import { Item } from './item';
import { Path1, Path2 } from './path';
import './style.scss';

const TopCompanies = ({ data }) => {
  const { multicolor_title, description, taxonomy } = data || {};
  const container = useRef(null);
  useGSAP(
    () => {
      if (document.querySelectorAll('.top_companies--title').length > 0) {
        gsap.from('.top_companies--title', {
          scrollTrigger: {
            trigger: '.top_companies--title',
            once: true,
            start: 'top bottom',
            end: 'bottom center',
          },
          y: 50,
          opacity: 0,
        });
      }

      if (document.querySelectorAll('.top_companies--description').length > 0) {
        gsap.from('.top_companies--description', {
          scrollTrigger: {
            trigger: '.top_companies--description',
            once: true,
            start: 'top bottom',
            end: 'bottom center',
          },
          y: 50,
          opacity: 0,
        });
      }

      if (document.querySelectorAll('.top_companies--items').length > 0) {
        gsap.from('.top_companies--items', {
          scrollTrigger: {
            trigger: '.top_companies--items',
            once: true,
            start: 'top bottom',
            end: 'bottom center',
          },
          y: 50,
          opacity: 0,
        });
      }
    },
    { scope: container }
  );
  return (
    <div ref={container} className="top_companies">
      <Path1 />
      <div className="container">
        <HtmlField text={multicolor_title} className="top_companies--title" />
        <HtmlField text={description} className="top_companies--description" />

        <Mapper
          array={taxonomy}
          children={Item}
          className={'top_companies--items'}
        />
      </div>
      <Path2 />
    </div>
  );
};

export default TopCompanies;
