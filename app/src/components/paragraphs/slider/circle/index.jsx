import { useGSAP } from '@gsap/react';
import { Icon } from 'components/elements/svg';
import { Talent } from 'components/elements/talent';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { HtmlField, Mapper } from 'shared/ui';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from '../../../elements';
import { Path } from './path';
import './style.scss';

gsap.registerPlugin(ScrollTrigger);

const copyPerson = person => {
  if (!person || person.items.length === 0) return [];

  // until person.lenght === 10 by filling the array with the same elements (in the same order)
  const persons =
    person.items.length <= 10
      ? person.items.concat(person.items, person.items, person.items)
      : person.items;

  return persons;
};

const SliderCircle = ({
  multicolor_title,
  paragraphs,
  description,
  subtitle,
  links,
}) => {
  const { person, taxonomy } = paragraphs?.items?.[0] || {};

  const swiperNavPrev = useRef(null);
  const swiperNavNext = useRef(null);

  const container = useRef(null);
  useGSAP(
    () => {
      if (document.querySelectorAll('.slider-circle__subtitle').length > 0) {
        gsap.from('.slider-circle__subtitle', {
          scrollTrigger: {
            trigger: '.slider-circle__subtitle',
            once: true,
            start: 'top bottom',
            end: 'bottom center',
          },
          y: 50,
          opacity: 0,
        });
      }

      if (document.querySelectorAll('.slider-circle__title').length > 0) {
        gsap.from('.slider-circle__title', {
          scrollTrigger: {
            trigger: '.slider-circle__title',
            once: true,
            start: 'top bottom',
            end: 'bottom center',
          },
          y: 50,
          opacity: 0,
        });
      }

      if (document.querySelectorAll('.slider-circle__description').length > 0) {
        gsap.from('.slider-circle__description', {
          scrollTrigger: {
            trigger: '.slider-circle__description',
            once: true,
            start: 'top bottom',
            end: 'bottom center',
          },
          y: 50,
          opacity: 0,
        });
      }

      if (document.querySelectorAll('.slider-circle__swiper').length > 0) {
        gsap.from('.slider-circle__swiper', {
          scrollTrigger: {
            trigger: '.slider-circle__swiper',
            once: true,
            start: 'top bottom',
            end: 'bottom center',
          },
          x: '-5vw',
          opacity: 0,
        });
      }
    },
    { scope: container }
  );

  return (
    <div ref={container} className="slider-circle">
      <div className="slider-circle__top-path" />
      <Path />
      <div className="slider-circle__swiper-block">
        <div className="slider-circle__circle" />
        <div className="arrows">
          <div ref={swiperNavPrev}>
            <Button
              className="btn btn-circle btn-primary prev"
              data={undefined}
              fake={undefined}
              children={undefined}
            >
              <Icon
                className="icon--turn-left"
                icon="angle--right"
                color="white"
                height="10px"
                width="16px"
              />
              <span className="visually-hidden">{'Swipe left'}</span>
            </Button>
          </div>
          <div ref={swiperNavNext}>
            <Button className="btn btn-circle btn-primary next">
              <Icon
                icon="angle--right"
                color="white"
                height="10px"
                width="16px"
              />
              <span className="visually-hidden">{'Swipe right'}</span>
            </Button>
          </div>
        </div>
        <Swiper
          modules={[Autoplay, Navigation]}
          navigation={{
            prevEl: swiperNavPrev.current,
            nextEl: swiperNavNext.current,
          }}
          slidesPerView={'auto'}
          loop={true}
          speed={1000}
          spaceBetween={70}
          className="slider-circle__swiper"
          dir="rtl"
          autoplay={{
            delay: 1500,
            // pauseOnMouseEnter: true,
          }}
          breakpoints={{
            1220: {
              slidesPerView: 2,
            },
            1625: {
              slidesPerView: 3,
            },
          }}
        >
          {person.items?.length > 0 &&
            copyPerson(person).map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <Talent
                    {...item}
                    chosen_tech={taxonomy?.items?.[0]}
                    color="purple"
                  />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>

      <div className="slider-circle__text">
        <HtmlField text={subtitle} className="slider-circle__subtitle purple" />
        <HtmlField text={multicolor_title} className="slider-circle__title" />
        <HtmlField text={description} className="slider-circle__description" />
        <Mapper array={links}>
          {link => <Button data={link} className="btn btn-secondary" />}
        </Mapper>
      </div>
    </div>
  );
};

export default SliderCircle;
