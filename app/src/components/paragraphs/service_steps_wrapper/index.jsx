import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './service_steps_wrapper.scss';

gsap.registerPlugin(ScrollTrigger);

const ServiceStepsWrapper = ({ data }) => {
  const container = useRef(null);
  const { service_step } = data || {};
  const items = service_step?.items || [];

  // Animation on scroll
  useGSAP(
    () => {
      gsap.from(container.current, {
        opacity: 0,
        y: 40,
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

  // Generate gradient colors from items
  const generateGradient = () => {
    if (items.length === 0) return 'transparent';
    
    const colors = items.map((item) => `#${item.background_color?.value}`);
    const stops = colors
      .map((color, index) => {
        const percentage = (index / (colors.length - 1)) * 100;
        return `${color} ${percentage}%`;
      })
      .join(', ');
    
    return `linear-gradient(to bottom, ${stops})`;
  };

  return (
    <div className="service-steps-wrapper" ref={container}>
      <div className="container-wrapper">
        <div
          className="service-steps-wrapper__timeline"
          // @ts-ignore
          style={{ '--gradient-colors': generateGradient() }}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              className="service-steps-wrapper__step"
              data-step={index + 1}
            >
              {/* Step Number Circle */}
              <div
                className="service-steps-wrapper__circle"
                style={{ backgroundColor: `#${item.background_color?.value}` }}
              >
                <span className="service-steps-wrapper__number">
                  {index + 1}
                </span>
              </div>

              {/* Step Content */}
              <div className="service-steps-wrapper__content">
                <h3
                  className="service-steps-wrapper__title"
                  style={{ backgroundColor: `#${item.background_color?.value}` }}
                >
                  {item.title?.value}
                </h3>
                <div
                  className="service-steps-wrapper__description"
                  dangerouslySetInnerHTML={{
                    __html: item.description?.value,
                  }}
                />
              </div>
            </div>
          ))}

          {/* Vertical Timeline Line */}
          <div className="service-steps-wrapper__line" />
        </div>
      </div>
    </div>
  );
};

export default ServiceStepsWrapper;
