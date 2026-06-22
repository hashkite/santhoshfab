import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { HorizontalScrollItem } from './item';
import './style.scss';
const HorizontalScroll = ({ data }) => {
  const { paragraphs } = data || {};
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);

    let ctx = gsap.context(() => {
      let sections = gsap.utils.toArray(
        '.horizontal-scroll__item',
        containerRef.current
      );
      const dots = document.querySelectorAll('.horizontal-scroll__nav-item');

      const startEnd = {
        start: 'center center',
        end: () => '+=' + containerRef.current.offsetWidth,
      };

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
        scrollTrigger: {
          ...startEnd,
          trigger: containerRef.current,
          pin: true,
          fastScrollEnd: false,
          pinType: 'transform',
          scrub: 1,
          snap: 1 / (sections.length - 1),
          onUpdate: self => {
            const index = Math.round(self.progress * (dots.length - 1) - 0.49);
            dots.forEach((dot, i) => {
              dot.classList.toggle('active', i <= index);
            });
          },
        },
      });

      // Fill progress bar depending on the scroll position
      gsap.to('.horizontal-scroll__progress-bar-fill', {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
          ...startEnd,
          trigger: containerRef.current,
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="horizontal-scroll__section">
      <div ref={containerRef} className="container">
        <div className="horizontal-scroll__nav">
          <div className="horizontal-scroll__progress-bar">
            <div className="horizontal-scroll__progress-bar-fill" />
          </div>
          <div className="horizontal-scroll__nav-dots">
            {paragraphs.items.map((item, index) => (
              <i
                className={`horizontal-scroll__nav-item`}
                key={item?.id}
                data-index={index}
              />
            ))}
          </div>
        </div>
        {paragraphs?.items && (
          <div className="horizontal-scroll__list">
            {paragraphs.items.map((item, index) => (
              <HorizontalScrollItem key={index} {...item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HorizontalScroll;
