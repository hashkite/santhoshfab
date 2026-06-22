import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Thumbs } from 'swiper/modules';

import ClientImpactCarouselItem from './item';
import ClientImpactCarouselThumbItem from './thumbItem';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import './clientImpactCarousel.scss';

const ClientImpactCarousel = ({ items }) => {
  const swiperPagination = useRef(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="client-impact-carousel__block">
      <div className="client-impact-carousel__inner">
        <div className="client-impact-carousel__swiper">
          <Swiper
            modules={[Pagination, Thumbs]}
            slidesPerView={1}
            loop={true}
            thumbs={{ swiper: thumbsSwiper }}
            pagination={{
              el: swiperPagination.current,
              clickable: true,
            }}
            speed={500}
            onSwiper={(swiper) => {
              setTimeout(() => {
                swiper.params.pagination.el = swiperPagination.current;
                swiper.pagination.destroy();
                swiper.pagination.init();
                swiper.pagination.render();
                swiper.pagination.update();
              });
            }}
          >
            {items && items.map(item => (
              <SwiperSlide key={item?.id}>
                <ClientImpactCarouselItem 
                  data={item}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="client-impact-carousel__swiper-thumbs">
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            slidesPerView={4}
            watchSlidesProgress={true}
            direction={'vertical'}
            modules={[Thumbs]}
          >
            {items && items.map(item => (
              <SwiperSlide key={item?.id}>
                <ClientImpactCarouselThumbItem 
                  data={item}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="client-impact-carousel__controls">
        <div className="client-impact-carousel__pagination" ref={swiperPagination} />
      </div>
    </div>
  )
}

export default ClientImpactCarousel