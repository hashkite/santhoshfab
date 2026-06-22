import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';
import './footprintsCarousel.scss';
import Picture from '../picture';

const FootprintsCarousel = ({ items }) => {
  return (
    <div className="footprints-carousel__block">
      <div className="container">
        <div className="footprints-carousel__swiper">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            spaceBetween={25}
            loop={true}
            speed={1000}
            autoplay={{
              delay: 1500,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              550: {
                slidesPerView: 2,
              },
              1220: {
                slidesPerView: 3,
              },
              1630: {
                slidesPerView: 4,
              },
            }}
          >
            {items?.map(item => (
              <SwiperSlide key={item?.id}>
                <div className="footprints-carousel__item">
                  {item?.icon?.items?.[0]?.src && (
                    <div className="footprints-carousel__flag">
                      <Picture image={item.icon.items[0]} />
                    </div>
                  )}
                  {item?.title && (
                    <div className="footprints-carousel__content">
                      <div className="footprints-carousel__country">
                        {item.title}
                      </div>
                      <div className="footprints-carousel__address">
                        {item?.contractor_compatible?.value && (
                          <span>{'Contactor support'}</span>
                        )}
                        {item?.eor_compatible?.value && <span>{'EOR'}</span>}
                      </div>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default FootprintsCarousel;
