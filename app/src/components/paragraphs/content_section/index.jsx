
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './style.scss';

gsap.registerPlugin(ScrollTrigger);

const ContentSection = ({ data }) => {
  if (!data) return null;

  const description = data.description?.value || '';
  const multicolorTitle = data.multicolor_title?.value || '';
  const sectionTitle = data.title?.value || '';
  const mapImage = data.image?.items?.[0]?.src || '';
  const testimonial = data.testimonial?.items?.[0] || null;
  const testimonialImg = testimonial?.media?.items?.[0]?.src || '';
  const testimonialName = testimonial?.name || '';
  const testimonialRole = testimonial?.role || '';
  const testimonialCompany = testimonial?.company || '';
  const testimonialText = testimonial?.title?.value || '';

  const container = useRef(null);

  useGSAP(() => {
    if (!container.current) return;
    gsap.from(container.current, {
      opacity: 0,
      y: 40,
      ease: 'power1.out',
      duration: 0.8,
      scrollTrigger: {
        trigger: container.current,
        start: 'top bottom',
        end: 'center top',
        once: true,
      },
    });
  }, { scope: container });

  return (
    <section ref={container} className="content-section">
      <div className="content-section__container">
        <div className="content-section__left">
          <div className="content-section__about">ABOUT BAIRESDEV</div>
          <div className="content-section__title" dangerouslySetInnerHTML={{ __html: multicolorTitle }} />
          <div className="content-section__desc" dangerouslySetInnerHTML={{ __html: description }} />
          {testimonial && (
            <div className="content-section__testimonial">
              <div className="content-section__testimonial-inner">
                <div className="content-section__testimonial-imgblock">
                  <img src={testimonialImg} alt={testimonialName} className="content-section__testimonial-img" />
                  <div className="content-section__testimonial-meta">
                    <div className="content-section__testimonial-person">{testimonialName}</div>
                    <div className="content-section__testimonial-role">{testimonialRole}</div>
                    <div className="content-section__testimonial-company">{testimonialCompany}</div>
                  </div>
                  <div className="content-section__testimonial-link">Watch {testimonialName}&apos;s Testimonial <span>→</span></div>
                </div>
                <div className="content-section__testimonial-quote">{testimonialText}</div>
              </div>
            </div>
          )}
        </div>
        <div className="content-section__right">
          <div className="content-section__map-wrap">
            <img src={mapImage} alt="Map" className="content-section__map-img" />
            {/* <div className="content-section__map-badge">
              <span className="content-section__map-badge-number">4000+</span>
              <span className="content-section__map-badge-label">Senior Developers in your time zone</span>
            </div> */}
            {/* You can add developer avatars and lines here as absolutely positioned elements for full fidelity */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
