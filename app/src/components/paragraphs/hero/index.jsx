import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

import { usePageContext } from '../../../app/context/page';
import {
  ArticleInfo,
  Breadcrumbs,
  CTAButtons,
  FormSubscribe,
  HeroCarousel,
  Picture,
} from '../../elements';
import { Sponsors, Webform } from '../../paragraphs';

gsap.registerPlugin(ScrollTrigger);

import classNames from 'classnames';
import { useTopMenu } from 'shared/hooks';
import './hero.scss';

const Hero = ({ data, ...other }) => {
  const {
    image,
    multicolor_title,
    paragraphs,
    type,
    description,
    hero_type,
    show_subscribe_form,
    slider_speed,
    delay,
    paragraph,
    webform,
    cta,
  } = data || {};
  const {
    date,
    author,
    title,
    paragraph: p,
    technologies,
    sub_service,
    node_type,
  } = other || {};
  const { breadcrumbs } = usePageContext();
  const { isExist } = useTopMenu();
  const container = useRef(null);

  useGSAP(
    () => {
      if (document.querySelectorAll('.hero__decor').length > 0) {
        gsap.from('.hero__decor svg', {
          ease: 'linear',
          scrollTrigger: {
            trigger: '.hero__decor svg',
            scrub: 2,
            start: 'top bottom-10%',
            end: 'center center',
          },
          scaleY: 0,
        });
      }
    },
    { dependencies: [data], scope: container }
  );

  return (
    <div
      ref={container}
      className={classNames(
        'hero__section',
        hero_type?.value
          ? ' --hero-block-type-' + hero_type.value
          : ' --default',
        type && ' --type-' + type,
        isExist && 'with-top-menu'
      )}
    >
      {type === 'hero_slider' && paragraphs?.items.length > 0 && (
        <>
          <HeroCarousel
            items={paragraphs.items}
            speed={slider_speed}
            delay={delay}
          />
          <div className="hero__decor">
            <svg
              width="1920"
              height="331"
              viewBox="0 0 1920 331"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1920 0.5625C1459.56 438.396 508.712 434.097 0.00494307 1.33322C0.00471737 231.354 0 330.562 0 330.562H1919.99C1919.99 330.562 1920 312.479 1920 0.5625Z"
                fill="#F8FBFF"
              />
            </svg>
          </div>
        </>
      )}
      {type === 'hero' && (
        <>
          {!hero_type?.value && image?.items?.[0]?.src && (
            <div className="hero__block-img">
              <Picture image={image.items[0]} />
            </div>
          )}
          <div
            className={`hero__block${
              hero_type?.value ? ' --type-' + hero_type.value : ' --default'
            }${node_type?.value === '1' ? ' case-study' : ''}`}
          >
            {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
            <div className={`container${webform ? ' has-webform' : ''}`}>
              {hero_type?.value &&
                hero_type.value !== 'tailored_teams' &&
                image?.items?.[0]?.src && (
                  <div className="hero__block-pic">
                    <Picture image={image.items[0]} />
                  </div>
                )}
              <div className="hero__block-cnt">
                {(multicolor_title?.value && (
                  <div
                    className="title"
                    dangerouslySetInnerHTML={{ __html: multicolor_title.value }}
                  />
                )) ||
                  (title && <h1>{title}</h1>)}
                {description?.value && (
                  <div
                    className="hero__block-description"
                    dangerouslySetInnerHTML={{ __html: description.value }}
                  />
                )}
                <CTAButtons items={cta?.items || []} variant="smart" className="hero__cta-buttons" />
                {show_subscribe_form && <FormSubscribe type="white" />}
                {(date || author || technologies || sub_service) && (
                  <ArticleInfo
                    date={date}
                    author={author}
                    sub_service={sub_service}
                    technologies={technologies}
                  />
                )}
              </div>
              {webform && (
                <div className="hero__webform">
                  <Webform dependentFields={true} data={webform} />
                </div>
              )}
              {p?.items?.[0]?.two_items?.items.length > 0 && (
                <div className="hero__block-people">
                  {p.items[0].two_items.items.map(item => {
                    const { id, person } = item;
                    const { image, title, role } = person?.items?.[0] || {};

                    return (
                      <div className="person-alt text-center" key={id}>
                        {image?.items?.[0]?.src && (
                          <div className="person-alt__pic">
                            <Picture image={image.items[0]} />
                          </div>
                        )}
                        <div className="person-alt__cnt">
                          {title && <h3>{title}</h3>}
                          {role?.items?.[0] && (
                            <div className="person-alt__role">
                              {role.items[0]}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          {hero_type?.value === 'tailored_teams' && (
            <div className="hero__decor">
              <svg
                width="1920"
                height="331"
                viewBox="0 0 1920 331"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1920 0.5625C1459.56 438.396 508.712 434.097 0.00494307 1.33322C0.00471737 231.354 0 330.562 0 330.562H1919.99C1919.99 330.562 1920 312.479 1920 0.5625Z"
                  fill="#E8EEF8"
                />
              </svg>
            </div>
          )}
        </>
      )}
      {paragraph?.items?.[0] && <Sponsors data={paragraph.items[0]} />}
    </div>
  );
};

export default Hero;
