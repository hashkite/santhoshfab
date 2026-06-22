import { useGSAP } from '@gsap/react';
import classNames from 'classnames';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { HtmlField } from 'shared/ui';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './style.scss';

gsap.registerPlugin(ScrollTrigger);

function splitArray(array, chunkSize = 5) {
  const transformedArray = [];
  let i = 0;

  if (!array || !array.length) return transformedArray;

  while (i < array.length) {
    let chunk = array.slice(i, i + chunkSize);

    let repeatedChunk = [];

    // Repeat chunk elements until repeatedChunk has 10 elements
    while (repeatedChunk.length < 10) {
      repeatedChunk = repeatedChunk.concat(chunk);
    }

    // Ensure exactly 10 elements
    repeatedChunk = repeatedChunk.slice(0, 10);

    transformedArray.push(repeatedChunk);
    i += chunkSize;
  }

  return transformedArray;
}

const AllServices = ({ data }) => {
  const { multicolor_title, images, description, number } = data;
  const list = splitArray(
    images?.items?.[0]?.paragraphs?.items,
    number?.value ? Number(number?.value) : 5
  );
  const container = useRef(null);
  useGSAP(
    () => {
      if (document.querySelectorAll('.all_services--title').length > 0) {
        gsap.from('.all_services--title', {
          scrollTrigger: {
            trigger: '.all_services--title',
            once: true,
            start: 'top bottom',
            end: 'bottom center',
          },
          y: 50,
          opacity: 0,
        });
      }

      if (document.querySelectorAll('.all_services--description').length > 0) {
        gsap.from('.all_services--description', {
          scrollTrigger: {
            trigger: '.all_services--description',
            once: true,
            start: 'top bottom',
            end: 'bottom center',
          },
          y: 50,
          opacity: 0,
        });
      }

      if (document.querySelectorAll('.swiper-no-swiping').length > 0) {
        gsap.from('.swiper-no-swiping', {
          scrollTrigger: {
            trigger: '.swiper-no-swiping',
            once: true,
            start: 'top bottom',
            end: 'bottom center',
          },
          y: 50,
          opacity: 0,
        });
      }
    },
    { scope: container }
  );
  return (
    <div ref={container} className="all_services">
      <div className="container">
        <HtmlField text={multicolor_title} className="all_services--title" />
        <HtmlField text={description} className="all_services--description" />
        {list.length > 0 &&
          list.map((array, index) => (
            <Swiper
              key={index}
              modules={[Autoplay]}
              slidesPerView={'auto'}
              speed={6000}
              spaceBetween={10}
              loop={true}
              autoplay={{
                delay: 0,
                reverseDirection: index % 2 === 0,
                pauseOnMouseEnter: false,
              }}
              noSwiping={true}
              breakpoints={{
                768: {
                  spaceBetween: 30,
                  speed: 10000,
                },
              }}
            >
              {[...array, ...array].map(
                ({ title, title_icon_color }, index) => (
                  <SwiperSlide key={index} className="swiper-no-swiping">
                    <HtmlField
                      text={title}
                      className={classNames(
                        'all_services--item-title',
                        title_icon_color?.value
                      )}
                    />
                  </SwiperSlide>
                )
              )}
            </Swiper>
          ))}
      </div>
    </div>
  );
};

export default AllServices;
