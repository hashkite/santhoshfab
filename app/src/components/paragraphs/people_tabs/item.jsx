import { useGSAP } from '@gsap/react';
import classNames from 'classnames';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useMemo, useRef, useState } from 'react';
import { HtmlField, LinkValidate, Mapper } from 'shared/ui';
import { Path, Path2 } from './path';
gsap.registerPlugin(ScrollTrigger);
const Arrow = props => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.0378 6.34317L13.6269 7.76069L16.8972 11.0157L3.29211 11.0293L3.29413 13.0293L16.8619 13.0157L13.6467 16.2459L15.0643 17.6568L20.7079 11.9868L15.0378 6.34317Z"
      fill="currentColor"
    />
  </svg>
);

export const BusinessItem = ({ items }) => {
  const [active, setActive] = useState(items?.[0]?.id);

  const { image, linked_in, subtitle, link, title, description } = useMemo(
    () => items.find(({ id }) => id === active) || {},
    [active, items]
  );

  const handleClick = id => setActive(id);

  useEffect(() => {
    setActive(items?.[0]?.id);
  }, [items]);

  const container = useRef(null);

  useGSAP(() => {
    if (document.querySelectorAll('.people-item').length > 0) {
      gsap.from('.people-item', {
        ease: 'linear',
        scrollTrigger: {
          trigger: '.people-item',
          scrub: 2,
          once: true,
          start: 'top bottom',
          end: 'top bottom',
        },
        y: 100,
        opacity: 0,
        stagger: 0.2,
      });
    }
  });

  return (
    <div ref={container} className="people-item">
      <Path />
      <Path2 />
      <div className="people-item__names">
        <h4>LEADERSHIP TEAM</h4>

        {items.map(({ id, title }) => (
          <button
            key={id}
            onClick={() => handleClick(id)}
            className={classNames('people-item__name', {
              active: active === id,
            })}
          >
            <Arrow />
            <HtmlField text={title} Tag={'span'} />
          </button>
        ))}
      </div>
      <div className="people-item__content">
        <Mapper array={image}>
          {attributes => (
            <img alt="" {...attributes} className="people-item__image" />
          )}
        </Mapper>
        <div className="people-item__info">
          <HtmlField text={subtitle} className="people-item__subtitle" />
          <HtmlField text={title} className="people-item__title" />
          <HtmlField text={description} className="people-item__description" />
          <div className="people-item__links">
            <Mapper
              array={link}
              children={item => (
                <LinkValidate
                  {...item}
                  title="Read More"
                  className={'people-item__read-more gradient-button'}
                />
              )}
            />
            <Mapper
              array={linked_in}
              children={item => (
                <LinkValidate {...item} className={'people-item__linked-in'}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.15105 0.503906C1.11993 0.503906 0.285323 1.34001 0.285156 2.3688C0.285156 3.39859 1.11976 4.23453 2.15122 4.23453C3.17984 4.23453 4.01561 3.39859 4.01561 2.3688C4.01561 1.33985 3.17967 0.503906 2.15105 0.503906Z"
                      fill="#21252B"
                    />
                    <path
                      d="M0.541727 5.64967H3.75921V16.0016H0.541727V5.64967Z"
                      fill="#21252B"
                    />
                    <path
                      d="M11.9501 5.39227C10.385 5.39227 9.33554 6.2504 8.90598 7.06415H8.86294V5.64967H5.77691V16.0014H8.99156V10.8804C8.99156 9.53027 9.24863 8.22256 10.9225 8.22256C12.5724 8.22256 12.5944 9.76666 12.5944 10.9669V16.0013H15.8095V10.3233C15.8095 7.53626 15.2082 5.39227 11.9501 5.39227Z"
                      fill="#21252B"
                    />
                  </svg>
                </LinkValidate>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
