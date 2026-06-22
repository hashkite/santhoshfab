import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Picture } from '../../elements';
import './logos_wrapper.scss';

gsap.registerPlugin(ScrollTrigger);

const LogosWrapper = ({ data }) => {
  console.log(data,'data in logos wrapper');
  const container = useRef(null);
  const { logo_item, background_color, is_carousal } = data || {};
  const items = logo_item?.items || [];
  const bgColor = background_color?.value ? `#${background_color.value}` : null;

  // Animation on scroll
  useGSAP(
    () => {
      gsap.from(container.current, {
        opacity: 0,
        scale: 0.95,
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

  // Layout 1: Background color with non-carousel (static grid)
  if (bgColor && !is_carousal) {
    return (
      <div className="logos-wrapper logos-wrapper--colored" ref={container}>
        <div
          className="logos-wrapper__background"
          style={{ backgroundColor: bgColor }}
        >
          <div className="container">
            <div className="logos-wrapper__grid">
              {items.map((item) => (
                <div key={item.id} className="logos-wrapper__item">
                  {item.image?.items?.[0] && (
                    <Picture
                      image={item.image.items[0]}
                      className="logos-wrapper__image"
                    />
                  )}
                  {item.review_score?.value && (
                    <div className="logos-wrapper__reviews">
                      <div className="logos-wrapper__stars">
                        {'★'.repeat(parseInt(item.review_score.value) / 20)}
                      </div>
                      <div className="logos-wrapper__review-count">
                        {item.review_numbers?.value}+ REVIEWS
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Layout 2: Carousel layout
  if (is_carousal) {
    return (
      <div className="logos-wrapper logos-wrapper--carousel" ref={container}>
        <div className="container">
          <div className="logos-wrapper__swiper-container">
            <Swiper
              modules={[Autoplay]}
              slidesPerView={3}
              spaceBetween={40}
              loop={true}
              speed={800}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 30 },
                1024: { slidesPerView: 3, spaceBetween: 40 },
              }}
            >
              {items.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="logos-wrapper__carousel-item">
                    {item.image?.items?.[0] && (
                      <Picture
                        image={item.image.items[0]}
                        className="logos-wrapper__image"
                      />
                    )}
                    {item.review_score?.value && (
                      <div className="logos-wrapper__reviews">
                        <div className="logos-wrapper__stars">
                          {'★'.repeat(parseInt(item.review_score.value) / 20)}
                        </div>
                        <div className="logos-wrapper__review-count">
                          {item.review_numbers?.value}+ REVIEWS
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
  }

  // Layout 3: Simple image grid (no background, no carousel)
  return (
    <div className="logos-wrapper logos-wrapper--simple" ref={container}>
      <div className="container">
        <div className="logos-wrapper__simple-grid">
          {items.map((item) => (
            <div key={item.id} className="logos-wrapper__simple-item">
              {item.image?.items?.[0] && (
                <Picture
                  image={item.image.items[0]}
                  className="logos-wrapper__image"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogosWrapper;
