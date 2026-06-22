import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

gsap.registerPlugin(ScrollTrigger);

import 'swiper/css';
import 'swiper/css/autoplay';
import { Picture } from '../../elements';
import { GridSponsors } from './grid';
import './sponsors.scss';

const Sponsors = ({ data }) => {
  const container = useRef(null);
  const { items } = data?.images?.items?.[0]?.images || data || {};

  useGSAP(
    () => {
      gsap.from(container.current, {
        opacity: 0,
        scale: 0.9,
        ease: 'power1.out',
        duration: 1,
        scrollTrigger: {
          trigger: container.current,
          start: 'top bottom',
          end: 'center top',
        },
      });
    },
    { dependencies: [items], scope: container }
  );

  if (data.grid) return <GridSponsors items={items} />;

  return (
    <div className="sponsors-carousel__block" ref={container}>
      <div className="container">
        <div className="sponsors-carousel__swiper">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={2}
            spaceBetween={32}
            loop={true}
            speed={1000}
            autoplay={{
              delay: 1500,
              pauseOnMouseEnter: false,
              disableOnInteraction: false,
            }}
            breakpoints={{
              768: {
                slidesPerView: 4,
              },
              1440: {
                slidesPerView: 6,
              },
            }}
          >
            {[...items, ...items, ...items]?.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="sponsors-carousel__item">
                  <Picture image={item} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
