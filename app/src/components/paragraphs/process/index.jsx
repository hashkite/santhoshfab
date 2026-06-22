import { useGSAP } from '@gsap/react';
import { Button } from 'components/elements';
import { gsap } from 'gsap';
import { useRef } from 'react';
import { HtmlField, Mapper } from 'shared/ui';
import { Item } from './item';
import './style.scss';

const Process = ({ data }) => {
  const { multicolor_title, description, paragraphs, link } = data || {};
  const container = useRef(null);
  useGSAP(
    () => {
      if (document.querySelectorAll('.process__title').length > 0) {
        gsap.from('.process__title', {
          scrollTrigger: {
            trigger: '.process__title',
            once: true,
            start: 'top bottom',
            end: 'bottom center',
          },
          y: 50,
          opacity: 0,
        });
      }

      if (document.querySelectorAll('.process__description').length > 0) {
        gsap.from('.process__description', {
          scrollTrigger: {
            trigger: '.process__description',
            once: true,
            start: 'top bottom',
            end: 'bottom center',
          },
          y: 50,
          opacity: 0,
        });
      }

      if (document.querySelectorAll('.process__items').length > 0) {
        gsap.from('.process__items', {
          scrollTrigger: {
            trigger: '.process__items',
            once: true,
            start: 'top bottom',
            end: 'bottom center',
          },
          y: 50,
          opacity: 0,
        });
      }

      if (document.querySelectorAll('.process__btn').length > 0) {
        gsap.from('.process__btn', {
          scrollTrigger: {
            trigger: '.process__btn',
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
    <div ref={container} className="process">
      <div className="container">
        <HtmlField text={multicolor_title} className="process__title" />
        <div className="process__content">
          <div className="process__content-bg">
            <HtmlField text={description} className="process__description" />
            <Mapper
              array={paragraphs}
              children={Item}
              className={'process__items'}
            />
          </div>
        </div>
        <Mapper array={link}>
          {link => <Button data={link} className="btn btn-secondary" />}
        </Mapper>
      </div>
    </div>
  );
};

export default Process;
