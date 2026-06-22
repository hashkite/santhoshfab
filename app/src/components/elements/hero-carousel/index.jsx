import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

gsap.registerPlugin(ScrollTrigger);

import HeroCarouselItem from './item';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import './heroCarousel.scss';

const HeroCarousel = ({ items, speed, delay }) => {
  const container = useRef(null);

  const animationStyles = `
    .hero-carousel__swiper .swiper.swiper-initialized .swiper-pagination .swiper-pagination-bullet-active::before {
      animation-duration: ${(delay?.value || 3500) / 1000 + 3.5}s;
    }
  `;

  useGSAP(
    () => {
      const timelineHero = gsap.timeline({
        scrollTrigger: {
          trigger: '.swiper-slide-active',
          start: 'top bottom',
          end: 'bottom top',
        },
      });

      timelineHero
        .from(
          `.swiper-slide-active .hero-carousel__item-content`,
          {
            x: '-5vw',
            scale: 0.9,
            opacity: 0,
            ease: 'power1.out',
            duration: 1,
          },
          0
        )
        .from(
          `.swiper-slide-active .hero-carousel__item-bg`,
          {
            scale: 0.9,
            opacity: 0,
            ease: 'power1.out',
            duration: 1,
          },
          '>-.8'
        );
      // .from(`.swiper-slide-active .hero-carousel__item-panel.--panel-earnings`, {
      //   scale: 0.5,
      //   opacity: 0,
      //   ease: "power1.out",
      //   duration: 1
      // }, '>-.5')
      // .from(`.swiper-slide-active .hero-carousel__item-panel.--panel-people`, {
      //   scale: 0.9,
      //   opacity: 0,
      //   ease: "power1.out",
      //   duration: 1
      // }, '<.4');
    },
    { dependencies: [items], scope: container }
  );

  return (
    <div className="hero-carousel__swiper" ref={container}>
      <style>{animationStyles}</style>
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        loop={true}
        speed={speed?.value || 1500}
        autoplay={{
          delay: delay?.value || 3500,
          pauseOnMouseEnter: true,
        }}
      >
        {items?.map(item => (
          <SwiperSlide key={item?.id}>
            <HeroCarouselItem data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;
