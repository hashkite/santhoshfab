import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { HtmlField } from 'shared/ui';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Path1, Path2 } from './paths';
import { Slide } from './slide';
import './style.scss';
gsap.registerPlugin(ScrollTrigger);
const SliderHugeTitle = ({ multicolor_title, paragraphs }) => {
  const container = useRef(null);
  useGSAP(
    () => {
      if (document.querySelectorAll('.slider__huge-title__title').length > 0) {
        gsap.from('.slider__huge-title__title', {
          scrollTrigger: {
            trigger: '.slider__huge-title__title',
            scrub: 2,
            once: true,
            start: 'top bottom-100%',
            end: 'center center',
          },
          opacity: 0,
          y: 50,
        });
      }

      if (document.querySelectorAll('.swiper-slide').length > 0) {
        gsap.from('.swiper-slide', {
          scrollTrigger: {
            trigger: '.swiper-slide',
            scrub: 2,
            once: true,
            start: 'top+1%',
            end: 'bottom',
          },
          delay: 0.2,
          opacity: 0,
          y: 50,
        });
      }
    },
    { scope: container }
  );
  return (
    <div ref={container} className="slider__huge-title">
      <div className="container">
        <div className="slider__huge-title__content">
          {multicolor_title && (
            <div className="slider__huge-title__title">
              <HtmlField text={multicolor_title} />
              <Path1 />
              <Path2 />
            </div>
          )}
          <Swiper
            modules={[Autoplay, Pagination]}
            grabCursor={true}
            slidesPerView={1}
            loop={true}
            speed={1000}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            // autoplay={{
            //   delay: 1000,
            //   pauseOnMouseEnter: true,
            // }}
          >
            {paragraphs?.items?.length > 0 &&
              paragraphs.items.map(({ id, ...otherProps }) => (
                <SwiperSlide key={id}>
                  <Slide {...otherProps} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default SliderHugeTitle;
