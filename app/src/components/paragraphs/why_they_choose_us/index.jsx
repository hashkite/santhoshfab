import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useRef } from 'react';
import { HtmlField, Mapper } from 'shared/ui';
import { Tiles } from './item';
import './style.scss';

const WhyTheyChooseUs = ({ data }) => {
  const { multicolor_title, description, paragraphs, image } = data || {};

  const imageAttributes = image?.items?.[0] || {};
  const container = useRef(null);
  useGSAP(
    () => {
      if (document.querySelectorAll('.why_they_choose_us--title').length > 0) {
        gsap.from('.why_they_choose_us--title', {
          scrollTrigger: {
            trigger: '.why_they_choose_us--title',
            once: true,
            start: 'top bottom',
            end: 'bottom center',
          },
          x: -50,
          opacity: 0,
        });
      }

      if (
        document.querySelectorAll('.why_they_choose_us--description').length > 0
      ) {
        gsap.from('.why_they_choose_us--description', {
          scrollTrigger: {
            trigger: '.why_they_choose_us--description',
            once: true,
            start: 'top bottom',
            end: 'bottom center',
          },
          x: -50,
          opacity: 0,
        });
      }

      if (document.querySelectorAll('.why_they_choose_us--items').length > 0) {
        gsap.from('.why_they_choose_us--items', {
          scrollTrigger: {
            trigger: '.why_they_choose_us--items',
            once: true,
            start: 'top bottom',
            end: 'bottom center',
          },
          x: 50,
          opacity: 0,
        });
      }
    },
    { scope: container }
  );
  return (
    <div ref={container} className="why_they_choose_us">
      <div className="container">
        <div className="why_they_choose_us--grid">
          <div className="why_they_choose_us--grid-text">
            <HtmlField
              text={multicolor_title}
              className="why_they_choose_us--title"
            />
            <HtmlField
              text={description}
              className="why_they_choose_us--description"
            />
          </div>

          {imageAttributes && (
            <img
              alt="why they choose us"
              {...imageAttributes}
              className="why_they_choose_us--image"
            />
          )}
          <Mapper
            array={paragraphs}
            children={Tiles}
            className={'why_they_choose_us--items'}
          />
        </div>
      </div>
    </div>
  );
};

export default WhyTheyChooseUs;
