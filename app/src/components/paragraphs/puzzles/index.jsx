import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { HtmlField, Mapper } from 'shared/ui';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Item } from './item';
import './style.scss';
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Puzzles = ({ data }) => {
  const container = useRef(null);
  const { multicolor_title, description, paragraphs } = data;
  useGSAP(
    () => {
      const puzzles = container.current.querySelectorAll('.puzzles__item');
      const puzzlesContainerHeight = Array.from(puzzles).reduce(
        (acc, item) => acc + item.getBoundingClientRect().height,
        0
      );

      let timeln = gsap.timeline({
        scrollTrigger: {
          trigger: '.puzzles__content',
          pin: true,
          start: 'top-=70px top',
          end: `+=${puzzlesContainerHeight / 1.5}`,
          snap: {
            snapTo: 1 / (puzzles.length - 1),
            duration: { min: 0.1, max: 0.3 },
            delay: 0,
          },
          scrub: 1,
        },
      });

      puzzles.forEach((puzzle, index) => {
        if (index === 0) {
          timeln.fromTo(
            puzzle,
            { opacity: 1, scale: 1, duration: 0.5, zIndex: 1 },
            {
              zIndex: 0,
              opacity: 0,
              scale: 0.95,
            }
          );
        } else if (index === puzzles.length - 1) {
          timeln.addLabel(`puzzles__item${index}`);
          timeln.fromTo(
            puzzle,
            {
              zIndex: 0,
              opacity: 0,
              scale: 0.95,
            },
            {
              zIndex: index,
              opacity: 1,
              scale: 1,
              duration: 0.5,
            }
          );
        } else {
          timeln
            .addLabel(`puzzles__item${index}`)
            .fromTo(
              puzzle,
              {
                zIndex: 0,
                opacity: 0,
                scale: 0.95,
              },
              {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                zIndex: index,
              }
            )
            .to(
              puzzle,
              {
                opacity: 0,
                scale: 0.95,
                duration: 0.5,
              },
              `+=0.5`
            );
        }
      });
    },
    { scope: container }
  );
  return (
    <div ref={container} className="puzzles">
      {(multicolor_title || description) && (
        <div className="puzzles__header">
          {multicolor_title && (
            <div className="puzzles__title">
              <HtmlField text={multicolor_title} />
            </div>
          )}
          <HtmlField text={description} className="puzzles__description" />
        </div>
      )}
      <div
        className="puzzles__content_bg"
        style={{ height: `${((paragraphs.items.length + 1) / 1.5) * 100}vh` }}
      >
        <Mapper
          className="puzzles__content"
          array={paragraphs}
          children={Item}
        />
      </div>
    </div>
  );
};

export default Puzzles;
