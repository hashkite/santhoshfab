import { useRef } from 'react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Button, Picture } from '../../../elements';
import { Icon } from '../../../elements/svg';
import './slider_default.scss';

const SliderDefault = ({ multicolor_title, paragraphs }) => {
  const swiperNavPrev = useRef(null);
  const swiperNavNext = useRef(null);

  return (
    <div className="slider">
      <div className="container">
        <div className="row">
          {multicolor_title?.value && (
            <div
              className="col-md-8 title"
              dangerouslySetInnerHTML={{ __html: multicolor_title.value }}
            />
          )}
          <div className="col-md-4 arrows">
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
        <div className="slider__swiper">
          <Swiper
            modules={[Autoplay, Navigation]}
            navigation={{
              prevEl: swiperNavPrev.current,
              nextEl: swiperNavNext.current,
            }}
            slidesPerView={1}
            loop={true}
            speed={1000}
            spaceBetween={20}
            autoplay={{
              delay: 1500,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              550: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              768: {
                spaceBetween: 25,
              },
              1440: {
                slidesPerView: 3,
              },
            }}
          >
            {paragraphs?.items?.length > 0 &&
              paragraphs.items.map(item => {
                const { id, icon, description, title } = item;

                return (
                  <SwiperSlide key={id}>
                    <div className="slider__item">
                      <div className="slider__item-header">
                        {icon?.items?.[0]?.src && (
                          <span className="img">
                            <Picture image={icon.items[0]} />
                          </span>
                        )}
                        {title?.value && <h3>{title.value}</h3>}
                      </div>
                      <div className="slider__item-content">
                        {description?.value && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: description.value,
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default SliderDefault;
