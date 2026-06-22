import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useRef } from 'react';
import { HtmlField } from 'shared/ui';
import './style.scss';

const WeAreFamaash = ({ data }) => {
  const { multicolor_title, description, image, title } = data || {};
  const imageAttributes = image?.items?.[0] || {};

  const container = useRef(null);
  useGSAP(
    () => {
      if (document.querySelectorAll('.we_are_famaash--title').length > 0) {
        gsap.from('.we_are_famaash--title', {
          scrollTrigger: {
            trigger: '.we_are_famaash--title',
            once: true,
            start: 'top bottom',
            end: 'bottom center',
          },
          y: 50,
          opacity: 0,
        });
      }

      if (document.querySelectorAll('.we_are_famaash--content').length > 0) {
        gsap.from('.we_are_famaash--content', {
          scrollTrigger: {
            trigger: '.we_are_famaash--content',
            once: true,
            start: 'top bottom',
            end: 'bottom center',
          },
          y: 100,
          duration: 1,
        });
      }

      if (document.querySelectorAll('.we_are_famaash--subtitle').length > 0) {
        gsap.from('.we_are_famaash--subtitle', {
          scrollTrigger: {
            trigger: '.we_are_famaash--subtitle',
            once: true,
            start: 'top bottom',
            end: 'bottom center',
          },
          y: 50,
          opacity: 0,
        });
      }

      if (
        document.querySelectorAll('.we_are_famaash--description').length > 0
      ) {
        gsap.from('.we_are_famaash--description', {
          scrollTrigger: {
            trigger: '.we_are_famaash--description',
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
    <div ref={container} className="we_are_famaash">
      <HtmlField
        text={multicolor_title}
        Tag="h2"
        className="we_are_famaash--title"
      />
      <div className="we_are_famaash--content">
        {imageAttributes && (
          <img
            alt="we are famaash"
            {...imageAttributes}
            className="we_are_famaash--image"
          />
        )}
        <div className="we_are_famaash--text">
          <HtmlField
            text={title}
            Tag="h3"
            className="we_are_famaash--subtitle"
          />
          <HtmlField
            text={description}
            className="we_are_famaash--description"
          />
        </div>
      </div>
    </div>
  );
};

export default WeAreFamaash;
