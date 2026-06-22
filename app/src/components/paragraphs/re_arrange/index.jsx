import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useState } from 'react';
import { HtmlField } from 'shared/ui';
import './style.scss';

gsap.registerPlugin(ScrollTrigger);

const ReArrange = ({ data }) => {
  const { multicolor_title, description, paragraphs } = data;
  const [active, setActive] = useState(0);

  const container = useRef(null);
  useGSAP(
    () => {
      if (document.querySelectorAll('.re_arrange__title').length > 0) {
        gsap.from('.re_arrange__title', {
          scrollTrigger: {
            trigger: '.re_arrange__title',
            once: true,
            start: 'top bottom',
            end: 'bottom center',
          },
          y: 50,
          opacity: 0,
        });
      }

      if (document.querySelectorAll('.re_arrange__description').length > 0) {
        gsap.from('.re_arrange__description', {
          scrollTrigger: {
            trigger: '.re_arrange__description',
            once: true,
            start: 'top bottom',
            end: 'bottom center',
          },
          y: 50,
          opacity: 0,
        });
      }

      if (document.querySelectorAll('.re_arrange__plans').length > 0) {
        gsap.from('.re_arrange__plans', {
          scrollTrigger: {
            trigger: '.re_arrange__plans',
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
    <div ref={container} className="re_arrange">
      <div className="container">
        <div className="re_arrange__content">
          <div className="re_arrange__content-bg">
            <HtmlField text={multicolor_title} className="re_arrange__title" />
            <HtmlField text={description} className="re_arrange__description" />

            {paragraphs?.items && (
              <div className="re_arrange__plans">
                {paragraphs?.items?.map(({ paragraphs }, index) => {
                  if (index !== active) return null;
                  const { description, multicolor_title, image } =
                    paragraphs?.items?.[0] || {};

                  return (
                    <div key={index} className="re_arrange__plans-item">
                      <div className="re_arrange__plans-item-content">
                        <HtmlField
                          text={multicolor_title}
                          className="re_arrange__plans-item-title"
                        />
                        <HtmlField
                          text={description}
                          className="re_arrange__plans-item-description"
                        />
                      </div>
                      <img
                        alt="re_arrange"
                        {...image?.items?.[0]}
                        className="re_arrange__plans-item-image"
                      />
                    </div>
                  );
                })}
                <div className="re_arrange__plans-buttons">
                  {paragraphs?.items?.map(({ title }, index) => (
                    <button
                      key={index}
                      className={`re_arrange__plans-item-button ${
                        index === active ? 'active' : ''
                      }`}
                      onClick={() => setActive(index)}
                    >
                      {title?.value}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReArrange;
