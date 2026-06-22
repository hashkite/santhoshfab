import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Talent } from 'components/elements/talent';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';

export const Peoples = ({ person, chosen_tech }) => {
  if (!person || person.items.length === 0) return null;
  // if elements lentgth >= 3 then copy array 3 times
  const peoples =
    person.items.length >= 3
      ? person.items.concat(person.items, person.items)
      : person.items;
  return (
    <div className="swiper-container">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={3}
        loop={true}
        speed={1000}
        spaceBetween={70}
        className="peoples__swiper"
        autoplay={{
          delay: 1500,
          // pauseOnMouseEnter: true,
        }}
        breakpoints={{
          550: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 2,
          },
          1625: {
            slidesPerView: 3,
          },
        }}
      >
        {peoples.map((item, index) => (
          <SwiperSlide key={index}>
            <Talent chosen_tech={chosen_tech} {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
