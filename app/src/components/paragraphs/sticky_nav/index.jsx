import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './sticky_nav.scss';

gsap.registerPlugin(ScrollTrigger);

const StickyNav = ({ data }) => {
  const container = useRef(null);
  const { nav_item } = data || {};
  const items = nav_item?.items || [];

  // GSAP Animation on scroll
  useGSAP(
    () => {
      if (container.current) {
        gsap.from(container.current, {
          opacity: 0,
          y: -20,
          ease: 'power1.out',
          duration: 0.6,
          scrollTrigger: {
            trigger: container.current,
            start: 'top bottom',
            end: 'bottom top',
          },
        });
      }
    },
    { dependencies: [data], scope: container }
  );

  if (!items.length) return null;

  const handleNavClick = (e, url) => {
    if (url.startsWith('#')) {
      e.preventDefault();
      const targetId = url.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 120; // Adjust offset for sticky nav height
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <nav className="sticky-nav" ref={container}>
      <div className="container">
        <ul className="sticky-nav__list">
          {items.map((item, idx) => (
            <li className="sticky-nav__item" key={idx}>
              {item.external ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sticky-nav__link"
                >
                  {item.title}
                  {item.external && (
                    <span
                      className="sticky-nav__external-icon"
                      title="External link"
                    >
                      ↗
                    </span>
                  )}
                </a>
              ) : (
                <a
                  href={item.url}
                  className="sticky-nav__link"
                  onClick={(e) => handleNavClick(e, item.url)}
                >
                  {item.title}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default StickyNav;
