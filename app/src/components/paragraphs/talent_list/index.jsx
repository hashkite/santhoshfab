import './style.scss';

import { useGSAP } from '@gsap/react';
import { Button } from 'components/elements';
import { Talent } from 'components/elements/talent';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { HtmlField, Mapper } from 'shared/ui';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Path3 } from './paths';

gsap.registerPlugin(ScrollTrigger);

const createPersonsArray = paragraphs => {
  if (!paragraphs?.items?.length) return [];
  const { person } = paragraphs.items?.[0] || {};
  if (!person || !person.items) return [];
  const persons = person.items;

  return [...persons, ...persons, ...persons, ...persons];
};

const TalentList = ({ data }) => {
  const { multicolor_title, paragraph, description, two_paragraphs, link } =
    data;

  const container = useRef(null);
  useGSAP(
    () => {
      if (document.querySelectorAll('.talent_list--title').length > 0) {
        gsap.from('.talent_list--title', {
          scrollTrigger: {
            trigger: '.talent_list--title',
            once: true,
            start: 'top bottom',
            end: 'bottom center',
          },
          y: 50,
          opacity: 0,
        });
      }

      if (document.querySelectorAll('.talent_list--description').length > 0) {
        gsap.from('.talent_list--description', {
          scrollTrigger: {
            trigger: '.talent_list--description',
            once: true,
            start: 'top bottom',
            end: 'bottom center',
          },
          y: 50,
          opacity: 0,
        });
      }

      if (document.querySelectorAll('.talent_list__titles').length > 0) {
        gsap.from('.talent_list__titles', {
          scrollTrigger: {
            trigger: '.talent_list__titles',
            once: true,
            start: 'top bottom',
            end: 'top center',
          },
          x: '-5vw',
          stagger: 0.2,
        });
      }

      if (document.querySelectorAll('.talent_list__buttons').length > 0) {
        gsap.from('.talent_list__buttons', {
          scrollTrigger: {
            trigger: '.talent_list__buttons',
            once: true,
            start: 'top bottom',
            end: 'top center',
          },
          y: 50,
          stagger: 0.2,
        });
      }

      if (document.querySelectorAll('.talent_list .swiper').length > 0) {
        gsap.from('.talent_list .swiper', {
          scrollTrigger: {
            trigger: '.talent_list .swiper',
            once: true,
            start: 'top bottom',
            end: 'top center',
          },
          x: '5vw',
          opacity: 0,
          stagger: 0.2,
        });
      }
    },
    { scope: container }
  );
  return (
    <div ref={container} className="talent_list">
      <div className="prefixes" />
      <div className="container">
        <HtmlField text={multicolor_title} className="talent_list--title" />
        <HtmlField text={description} className="talent_list--description" />
        <Mapper className={'talent_list__titles'} array={two_paragraphs}>
          {({ title, index }) => (
            <>
              {index === 0 && <hr />}
              <div className="talent_list__titles-item">
                <Path3 />
                <HtmlField text={title} Tag={'span'} />
              </div>
              <hr />
            </>
          )}
        </Mapper>
        <Mapper array={link} className={'talent_list__buttons'}>
          {link => (
            <Button
              data={link}
              className="talent_list__button btn btn-primary"
            />
          )}
        </Mapper>
      </div>
      <div className="swiper-container">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={'auto'}
          speed={1000}
          spaceBetween={15}
          loop={true}
          centeredSlides={true}
          autoplay={{
            delay: 1000,
            pauseOnMouseEnter: false,
          }}
          noSwiping={true}
          breakpoints={{
            550: {
              spaceBetween: 15,
            },
            768: {
              spaceBetween: 30,
            },
            1625: {
              spaceBetween: 30,
            },
          }}
        >
          {createPersonsArray(paragraph).map((item, index) => (
            <SwiperSlide key={index}>
              <Talent
                {...item}
                chosen_tech={paragraph?.items?.[0].taxonomy?.items?.[0]}
                color="purple"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TalentList;
