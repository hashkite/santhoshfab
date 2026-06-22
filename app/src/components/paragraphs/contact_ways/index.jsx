import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { HtmlField, Mapper } from 'shared/ui';
import { ContactWaysItem } from './item';
import { Path2 } from './path';
import './style.scss';

gsap.registerPlugin(ScrollTrigger);

const ContactWays = ({ data }) => {
  const { multicolor_title, paragraphs } = data || {};

  const container = useRef(null);

  useGSAP(
    () => {
      if (document.querySelectorAll('.horizontal-tabs__decor').length > 0) {
        gsap.from('.horizontal-tabs__decor svg', {
          ease: 'linear',
          scrollTrigger: {
            trigger: '.horizontal-tabs__decor svg',
            scrub: 2,
            start: 'top bottom',
            end: 'center center',
          },
          scaleY: 0,
        });
      }
    },
    { dependencies: [data], scope: container }
  );
  return (
    <div ref={container} className="contact-ways__section">
      <div className="container relative">
        <Path2 />
        <div className="contact-ways__content">
          <div className="contact-ways__title">
            <HtmlField
              text={multicolor_title}
              Tag="h2"
              className="contact-ways__title-text"
            />
          </div>
          <Mapper className={'contact-ways__items'} array={paragraphs}>
            {data => <ContactWaysItem {...data} />}
          </Mapper>
        </div>
      </div>
      <div className="horizontal-tabs__decor">
        <svg
          width="1920"
          height="168"
          viewBox="0 0 1920 168"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d=" M1920,0.5625 C1459.56,250.396,508.712,250.097,0.00494307,1.33322 C0.00471737,131.354,0,130.562,0,190.562 H1919.99 C1919.99,330.562,1920,112.479,1920,0.5625 L Z"
            fill="#0F0C1E"
          />
        </svg>
      </div>
    </div>
  );
};

export default ContactWays;
