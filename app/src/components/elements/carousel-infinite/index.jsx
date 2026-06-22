import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import CarouselInfiniteItem from './item';

import 'swiper/css';
import 'swiper/css/autoplay';
import './carouselInfinite.scss';

const CarouselInfinite = ({ items, mode }) => {
  const [clonnedItems, setClonnedItems] = useState(items);

  useEffect(() => {
    if(items.length < 6){
      setClonnedItems([...items, ...items]);
    }
  }, [items])
  

  return (
    <div className={`carousel-infinite__swiper${mode ? ' --mode-'+mode : ''}`}>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        spaceBetween={25}
        loop={true}
        speed={1500}
        autoplay={{
          delay: 0,
          pauseOnMouseEnter: true
        }}
        breakpoints={{
          500: {
            slidesPerView: 2
          },
          768: {
            slidesPerView: 3
          },
          1024: {
            slidesPerView: 4
          }
        }}
      >
        {clonnedItems && clonnedItems.map((item, index) => (
          <SwiperSlide key={index}>
            <CarouselInfiniteItem data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CarouselInfinite