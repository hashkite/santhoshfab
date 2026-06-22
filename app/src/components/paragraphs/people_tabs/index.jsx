import { useGSAP } from '@gsap/react';
import classNames from 'classnames';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useState } from 'react';
import { HtmlField, Mapper } from 'shared/ui';
import { BusinessItem } from './item';
import './style.scss';

gsap.registerPlugin(ScrollTrigger);

const filterByTitle = (paragraphs, id) => {
  if (!paragraphs || !paragraphs.items) return [];
  return paragraphs.items.find(item => item.id === id);
};

const PeopleTabs = ({ data }) => {
  const { multicolor_title, description, paragraphs } = data;
  const [active, setActive] = useState(paragraphs?.items?.[0]?.id);
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

      if (document.querySelectorAll('.people-tabs__title').length > 0) {
        gsap.from('.people-tabs__title', {
          scrollTrigger: {
            trigger: '.people-tabs__title',
            scrub: 2,
            once: true,
            start: 'top bottom',
            end: 'bottom center',
          },
          x: -100,
          opacity: 0,
        });
      }

      if (document.querySelectorAll('.people-tabs__description').length > 0) {
        gsap.from('.people-tabs__description', {
          scrollTrigger: {
            trigger: '.people-tabs__description',
            scrub: 2,
            once: true,
            start: 'top bottom',
            end: 'bottom center',
          },
          x: -100,
          opacity: 0,
        });
      }

      if (document.querySelectorAll('.people-tabs__button-list').length > 0) {
        gsap.from('.people-tabs__button-list', {
          scrollTrigger: {
            trigger: '.people-tabs__button-list',
            scrub: 2,
            once: true,
            start: 'top bottom',
            end: 'bottom center',
          },
          x: 100,
          opacity: 0,
        });
      }

      if (document.querySelectorAll('.people-tabs__button').length > 0) {
        gsap.from('.people-tabs__button', {
          scrollTrigger: {
            trigger: '.people-tabs__button',
            scrub: 2,
            once: true,
            start: 'top bottom',
            end: 'bottom center',
          },
          x: 100,
          opacity: 0,
          stagger: 0.2,
        });
      }
    },
    { dependencies: [data], scope: container }
  );
  return (
    <div ref={container} className="people-tabs">
      <div className="container">
        <div className="people-tabs__header">
          <div>
            <HtmlField className="people-tabs__title" text={multicolor_title} />
            <HtmlField
              className="people-tabs__description"
              text={description}
            />
          </div>
          <Mapper className={'people-tabs__button-list'} array={paragraphs}>
            {({ id, title }) =>
              title && (
                <button
                  key={id}
                  onClick={() => setActive(id)}
                  className={classNames('people-tabs__button gradient-button', {
                    active: active === id,
                  })}
                >
                  <HtmlField text={title} Tag={'span'} />
                </button>
              )
            }
          </Mapper>
        </div>
        <BusinessItem {...filterByTitle(paragraphs, active)?.paragraphs} />
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
            d="M0 157C253.652 59.4462 590.44 0 960 0C1329.56 0 1666.35 59.4462 1920 157V167.5H0V157Z"
            fill="#0F0C1E"
          />
        </svg>
      </div>
    </div>
  );
};

export default PeopleTabs;
