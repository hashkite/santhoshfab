import { Sponsors, Webform } from '../../paragraphs';

import { useGSAP } from '@gsap/react';
import classNames from 'classnames';
import { Button } from 'components/elements';
import { Icon } from 'components/elements/svg';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import { useTopMenu } from 'shared/hooks';
import { HtmlField, Mapper } from 'shared/ui';
import { Countries } from './countries';
import { Media } from './media';
import { Peoples } from './peoples';
import './style.scss';
import { Tiles } from './tiles';
import { getLeft, getTop } from './utils';

gsap.registerPlugin(ScrollTrigger);

const HeroPlus = ({ data = {} }) => {
  const {
    title,
    multicolor_title,
    paragraphs,
    subtitle,
    description,
    link,
    media,
    align_text_left,
    large_height,
    webform,
    tags,
    paragraph,
    two_paragraphs,
    media_position
  } = data;
  const { isExist } = useTopMenu();
  const container = useRef(null);
  const { person, taxonomy } = paragraph?.items?.[0] || {};

  useGSAP(
    () => {
      if (document.querySelectorAll('.hero__decor').length > 0) {
        gsap.from('.hero__decor svg', {
          ease: 'linear',
          scrollTrigger: {
            trigger: '.hero__decor svg',
            scrub: 2,
            start: 'top bottom-100%',
            end: 'center center',
          },
          scaleY: 0,
        });
      }

      // animate fade title
      if (title) {
        gsap.from('.hero-plus__title', {
          opacity: 0,
          y: 50,
          delay: 0.2,
        });
      }

      // animate fade subtitle
      if (subtitle) {
        gsap.from('.hero-plus__subtitle', {
          opacity: 0,
          y: 50,
        });
      }

      // animate fade description
      if (description) {
        gsap.from('.hero-plus__description', {
          opacity: 0,
          y: 50,
          delay: 0.3,
        });
      }

      // animate fade media
      if (media) {
        gsap.from('.hero-plus__media', {
          opacity: 0,
          y: 50,
          delay: 0.5,
        });
      }

      if (document.querySelectorAll('.hero-plus__sponsors').length > 0) {
        // animate fade sponsors
        gsap.from('.hero-plus__sponsors', {
          opacity: 0,
          y: 50,
          delay: 0.6,
        });
      }
      // animate fade webform
      if (webform) {
        gsap.from('.hero__webform', {
          opacity: 0,
          y: 50,
          delay: 0.4,
        });
      }

      // animate fade tiles
      if (two_paragraphs) {
        gsap.from('.hero-plus__tiles', {
          opacity: 0,
          y: 50,
          delay: 0.6,
        });
      }

      // animate link
      if (link) {
        gsap.from('.hero-plus__link', {
          opacity: 0,
          y: 50,
          delay: 0.7,
        });
      }

      // animate fade peoples
      if (person) {
        gsap.from('.peoples__swiper', {
          opacity: 0,
          x: 100,
          delay: 0.8,
        });
      }
    },
    { dependencies: [data], scope: container }
  );

  const [animate, setAnimate] = useState(true);
  const [intervalId, setIntervalId] = useState(null);
  const [activeCountry, setActiveCountry] = useState(null);

  const getFieldGroup = () => {
    if (!tags) return [];
    if (!container.current) return [];
    const groups = container.current.querySelectorAll(
      'g[vectornator\\:layername]'
    );
    const chosenCountries = tags.items.map(tag => tag.title);
    return Array.from(groups).filter(group =>
      chosenCountries.includes(group.getAttribute('vectornator:layername'))
    );
  };

  useEffect(() => {
    if (!tags) return;
    const filteredGroups = getFieldGroup();

    setActiveCountry(filteredGroups[0].getAttribute('vectornator:layername'));
  }, [container]);

  useEffect(() => {
    if (!tags) return;
    const filteredGroups = getFieldGroup();

    filteredGroups.forEach(group => {
      group.addEventListener('mouseenter', () => {
        setAnimate(false);
        clearInterval(intervalId);

        setActiveCountry(group.getAttribute('vectornator:layername'));
      });

      group.addEventListener('mouseleave', e => {
        //if mouseleave go to popup return
        if (
          e.relatedTarget?.classList.contains('footprints-carousel__item') ||
          e.relatedTarget?.classList.contains('popup')
        )
          return;
        setAnimate(true);
      });
    });
  }, [tags, intervalId]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!animate) return;
      const filteredGroups = getFieldGroup();
      if (!filteredGroups.length) return;
      const nextCountry = activeCountry
        ? filteredGroups.findIndex(
            group =>
              group.getAttribute('vectornator:layername') === activeCountry
          ) + 1
        : 0;

      if (nextCountry >= filteredGroups.length) {
        setActiveCountry(
          filteredGroups[0].getAttribute('vectornator:layername')
        );
        return;
      }

      setActiveCountry(
        filteredGroups[nextCountry].getAttribute('vectornator:layername')
      );
    }, 3000);

    setIntervalId(interval);

    return () => clearInterval(intervalId);
  }, [animate, activeCountry]);

  useEffect(() => {
    if (tags) {
      //preload flag images
      tags.items.forEach(({ icon }) => {
        if (!icon) return;
        const img = new Image();
        img.src = icon.items[0].src;
      });
    }
  }, [tags]);

  return (
    <div
      ref={container}
      className={classNames(
        'hero-plus__section',
        isExist && 'with-top-menu',
        align_text_left && 'align-text-left',
        large_height && 'large-height',
        webform && 'with-webform',
        paragraphs && 'with-sponsors',
        tags && 'with-tags',
        two_paragraphs && 'two-paragraphs',
        person && 'peoples'
      )}
    >
      {/* Render media as background if media_position is not left/right */}
      {(!media_position || (media_position.value !== 'left' && media_position.value !== 'right')) && (
        <Mapper array={media} children={Media} />
      )}
      {tags &&
        tags.items &&
        tags.items.map(tag => {
          const tagTitle = tag.title;
          if (!tagTitle) return null;
          const svg = document.querySelector(
            `g[vectornator\\:layername="${tagTitle}"]`
          );
          if (!svg) return null;
          return (
            <div
              key={tag.title.value}
              className={`popup ${tagTitle} ${
                activeCountry === tagTitle ? 'active' : ''
              }`}
              style={{
                position: 'absolute',
                pointerEvents: 'none',
                left: getLeft(tagTitle),
                top: getTop(tagTitle),
              }}
            >
              <Countries {...tag} isActive={activeCountry === tagTitle} />
            </div>
          );
        })}
      <div className="container">
        {/* Side-by-side media/content if media_position is left/right */}
        {(media_position?.value === 'left' || media_position?.value === 'right') ? (
          <div className={classNames('hero-plus__content', 'hero-plus__content--sidebyside', media_position?.value === 'left' ? 'media-left' : 'media-right')}>
            {media_position?.value === 'left' && <div className="hero-plus__media"><Mapper array={media} children={Media} /></div>}
            <div className="hero-plus__text">
              <HtmlField
                text={subtitle}
                Tag="h5"
                className="hero-plus__subtitle"
              />
              <HtmlField
                text={title || multicolor_title}
                Tag={'h2'}
                className="hero-plus__title"
              />
              <HtmlField text={description} className="hero-plus__description" />
              <Mapper
                array={two_paragraphs}
                children={Tiles}
                className={'hero-plus__tiles'}
              />
              {link &&
                link?.items?.length > 0 &&
                link.items.map((item, index) => (
                  <div key={index} className="hero-plus__link">
                    <Button key={index} data={item} className="btn btn-link">
                      <div className="icon">
                        <Icon
                          icon="arrow--long--right"
                          color="#DD9A34"
                          height="11px"
                          width="22px"
                        />
                      </div>
                    </Button>
                  </div>
                ))}
            </div>
            {media_position?.value === 'right' && <div className="hero-plus__media"><Mapper array={media} children={Media} /></div>}
            {webform && (
              <div className="hero__webform">
                <Webform
                  dependentFields={true}
                  data={webform}
                  submissionMessage={
                    "Thank you for contacting us. We'll be in touch soon."
                  }
                />
              </div>
            )}
          </div>
        ) : (
          <div className="hero-plus__content">
            <div className="hero-plus__text">
              <HtmlField
                text={subtitle}
                Tag="h5"
                className="hero-plus__subtitle"
              />
              <HtmlField
                text={title || multicolor_title}
                Tag={'h2'}
                className="hero-plus__title"
              />
              <HtmlField text={description} className="hero-plus__description" />
              <Mapper
                array={two_paragraphs}
                children={Tiles}
                className={'hero-plus__tiles'}
              />
              {link &&
                link?.items?.length > 0 &&
                link.items.map((item, index) => (
                  <div key={index} className="hero-plus__link">
                    <Button key={index} data={item} className="btn btn-link">
                      <div className="icon">
                        <Icon
                          icon="arrow--long--right"
                          color="#DD9A34"
                          height="11px"
                          width="22px"
                        />
                      </div>
                    </Button>
                  </div>
                ))}
            </div>
            {webform && (
              <div className="hero__webform">
                <Webform
                  dependentFields={true}
                  data={webform}
                  submissionMessage={
                    "Thank you for contacting us. We'll be in touch soon."
                  }
                />
              </div>
            )}
          </div>
        )}
      </div>
      <Peoples person={person} chosen_tech={taxonomy?.items?.[0]} />

      {/* <Mapper array={person} className={'peoples'}>
        {(item, index) => (
          <Talent key={index} chosen_tech={taxonomy?.items?.[0]} {...item} />
        )}
      </Mapper> */}
      <Mapper array={paragraphs}>
        {(data, index) => <Sponsors key={index} data={data} />}
      </Mapper>

      {large_height && (
        <div className="hero__decor">
          <svg
            width="1920"
            height="190"
            viewBox="0 0 1920 190"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d=" M1920,0.5625 C1459.56,250.396,508.712,250.097,0.00494307,1.33322 C0.00471737,131.354,0,130.562,0,190.562 H1919.99 C1919.99,330.562,1920,112.479,1920,0.5625 L Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default HeroPlus;
