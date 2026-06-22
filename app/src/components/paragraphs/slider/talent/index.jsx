import { useRef, useState } from 'react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Button, Picture } from '../../../elements';
import { Icon } from '../../../elements/svg';
import './style.scss';

const SliderTalent = ({ multicolor_title, paragraphs, description }) => {
  const swiperNavPrev = useRef(null);
  const swiperNavNext = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="slider-talent">
      <div className="container">
        <div className="row">
          {multicolor_title?.value && (
            <div
              className="col-md-8 title"
              dangerouslySetInnerHTML={{ __html: multicolor_title.value }}
            />
          )}
          {description?.value && (
            <div
              className="col-md-8 description"
              dangerouslySetInnerHTML={{ __html: description.value }}
            />
          )}
          <div className="col-md-4 arrows">
            <div className="counter">
              <span>
                {currentSlide + 1 < 10
                  ? `0${currentSlide + 1}`
                  : currentSlide + 1}
              </span>{' '}
              <span>{'/'}</span>{' '}
              <span>
                {paragraphs?.items?.length < 10
                  ? `0${paragraphs?.items?.length}`
                  : paragraphs?.items?.length}
              </span>
            </div>
            <div ref={swiperNavPrev}>
              <Button className="navigation navigation-prev">
                <Icon
                  className="icon--arrow-left"
                  icon="arrow--long--left"
                  color="white"
                  height="10px"
                  width="16px"
                />
                <span className="visually-hidden">{'Swipe left'}</span>
              </Button>
            </div>
            <div ref={swiperNavNext}>
              <Button className="navigation navigation-next">
                <Icon
                  className="icon--arrow-right"
                  icon="arrow--long--left"
                  color="white"
                  height="10px"
                  width="16px"
                />
                <span className="visually-hidden">{'Swipe right'}</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="slider-talent__swiper">
          <Swiper
            modules={[Autoplay, Navigation]}
            navigation={{
              prevEl: swiperNavPrev.current,
              nextEl: swiperNavNext.current,
            }}
            slidesPerView={1}
            onSlideChange={({ realIndex }) => setCurrentSlide(realIndex)}
            loop={false}
            speed={1000}
            spaceBetween={20}
            autoplay={{
              delay: 2500,
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
                    <div className="slider-talent__item">
                      <div className="slider__item-header">
                        {icon?.items?.[0]?.src && (
                          <span className="img">
                            <Picture image={icon.items[0]} />
                          </span>
                        )}
                      </div>
                      <div className="slider-talent__item-content">
                        {title?.value && <h3>{title.value}</h3>}
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

export default SliderTalent;
