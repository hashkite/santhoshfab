import { useRef } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Button } from '../';
import { Icon } from '../svg';
import Slide from './slide';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './postsCarousel.scss';

const PostsCarousel = ({ items }) => {
  const swiperNavPrev = useRef(null);
  const swiperNavNext = useRef(null);
  const swiperPagination = useRef(null);

  return (
    <div className="posts-carousel__swiper">
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        spaceBetween={35}
        // centeredSlides={true}
        // loopAdditionalSlides={30}
        // loop={true}
        navigation={{
          prevEl: swiperNavPrev.current,
          nextEl: swiperNavNext.current,
        }}
        pagination={{
          el: swiperPagination.current,
          clickable: true,
        }}
        breakpoints={{
          550: {
            spaceBetween: 25,
            slidesPerView: 2,
          },
          1024: {
            spaceBetween: 25,
            slidesPerView: 3,
          },
        }}
        onSwiper={swiper => {
          setTimeout(() => {
            swiper.params.navigation.prevEl = swiperNavPrev.current;
            swiper.params.navigation.nextEl = swiperNavNext.current;
            swiper.navigation.destroy();
            swiper.navigation.init();
            swiper.navigation.update();

            swiper.params.pagination.el = swiperPagination.current;
            swiper.pagination.destroy();
            swiper.pagination.init();
            swiper.pagination.render();
            swiper.pagination.update();
          });
        }}
      >
        {items &&
          items.map(item => (
            <SwiperSlide key={item?.id}>
              <Slide data={item} />
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="posts-carousel__controls">
        <div ref={swiperNavPrev}>
          <Button className="btn btn-square btn-gray-border">
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
        <div className="posts-carousel__pagination" ref={swiperPagination} />
        <div ref={swiperNavNext}>
          <Button className="btn btn-square btn-gray-border">
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
    </div>
  );
};

export default PostsCarousel;
