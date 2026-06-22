import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { HtmlField, Mapper } from 'shared/ui';
import { ValuesItem } from './item';
import { NewUi } from './new_ui';
import './style.scss';
gsap.registerPlugin(ScrollTrigger);
const OurValues = ({ data }) => {
  const { title, description, paragraphs, new_ui } = data;
  const container = useRef(null);
  useGSAP(
    () => {
      if (document.querySelectorAll('.our_values h2').length > 0) {
        gsap.from('.our_values h2', {
          scrollTrigger: {
            trigger: '.our_values h2',
            scrub: 2,
            once: true,
            start: 'top bottom',
            end: 'bottom center',
          },
          y: 50,
          opacity: 0,
        });
      }

      if (document.querySelectorAll('.our_values .desc').length > 0) {
        gsap.from('.our_values .desc', {
          scrollTrigger: {
            trigger: '.our_values .desc',
            scrub: 2,
            once: true,
            start: 'top bottom',
            end: 'bottom center',
          },
          y: 50,
          delay: 0.4,
          opacity: 0,
        });
      }

      if (document.querySelectorAll('.values-item').length > 0) {
        gsap.from('.values-item', {
          scrollTrigger: {
            trigger: '.values-item',
            scrub: 2,
            once: true,
            start: 'top bottom',
            end: 'top center',
          },
          y: 50,
          delay: 0.6,
          opacity: 0,
          stagger: 0.2,
        });
      }
    },
    { scope: container }
  );

  useEffect(() => {
    const div = document.querySelectorAll('[aria-label="our_values"]');
    if (!div) return;
    const divArray = Array.from(div);
    const navLink = document.querySelector(
      '.header .header__right .btn.btn-secondary'
    );
    if (divArray.length === 0 || !navLink) return;
    const links = divArray.reduce((acc, item) => {
      const link = item.querySelectorAll('a.popup');
      if (!link) return;
      const linkArray = Array.from(link);
      return [...acc, ...linkArray];
    }, []);

    if (!links || links.length === 0) return;

    links.forEach(item => {
      item.addEventListener('click', e => {
        e.preventDefault();
        navLink.click();
      });
    });

    return () => {
      links.forEach(item => {
        item.removeEventListener('click', e => {
          e.preventDefault();
          navLink.click();
        });
      });
    };
  }, []);

  if (new_ui) return <NewUi {...data} />;

  return (
    <div ref={container} aria-label="our_values" className="our_values">
      <div className="container">
        <HtmlField text={title} Tag="h2" />
        <HtmlField text={description} Tag="p" className="desc" />
        <Mapper
          className={'our_values--grid'}
          array={paragraphs}
          children={ValuesItem}
        />
      </div>
    </div>
  );
};
export default OurValues;
