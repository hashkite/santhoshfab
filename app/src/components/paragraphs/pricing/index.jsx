import { useGSAP } from '@gsap/react';
import { Button } from 'components/elements';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { HtmlField, Mapper } from 'shared/ui';
import './style.scss';

gsap.registerPlugin(ScrollTrigger);

const Pricing = ({ data }) => {
  const { multicolor_title, description, paragraphs, title, link } = data;

  const container = useRef(null);
  useGSAP(
    () => {
      if (document.querySelectorAll('.pricing__title').length > 0) {
        gsap.from('.pricing__title', {
          scrollTrigger: {
            trigger: '.pricing__title',
            once: true,
            start: 'top bottom',
            end: 'bottom center',
          },
          y: 50,
          opacity: 0,
        });
      }

      if (document.querySelectorAll('.pricing__content').length > 0) {
        gsap.from('.pricing__content', {
          scrollTrigger: {
            trigger: '.pricing__content',
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
    <div ref={container} className="pricing">
      <div className="container">
        <HtmlField text={multicolor_title} className="pricing__title" />
        <div className="pricing__content">
          <div className="pricing__content-bg">
            <HtmlField text={title} className="pricing__content__title" />
            <HtmlField
              text={description}
              className="pricing__content__description"
            />
            <Mapper array={link}>
              {link => <Button data={link} className="btn btn-secondary" />}
            </Mapper>
            <div className="pricing__plans">
              {paragraphs?.items &&
                paragraphs?.items?.map(({ title }, index) => (
                  <HtmlField key={index} text={title} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
