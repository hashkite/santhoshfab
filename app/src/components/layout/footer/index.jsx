import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

import { getMultiData } from '../../../shared/api';
import { Button, FormSubscribe, NavFooter, Picture } from '../../elements/';
import { Icon } from '../../elements/svg';
import { StartCooperation } from '../../paragraphs';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useQueries } from 'react-query';
import './footer.scss';

gsap.registerPlugin(ScrollTrigger);

const Footer = ({ title, nodeIsLoading }) => {
  const queries = useQueries([
    { queryKey: 'footerTop', queryFn: getMultiData('fetch/menu/footer-top') },
    { queryKey: 'footerBottom', queryFn: getMultiData('fetch/menu/footer') },
    {
      queryKey: 'startCooperation',
      queryFn: getMultiData('fetch/config_pages/start_cooperation'),
    },
    {
      queryKey: 'startCooperationTop',
      queryFn: getMultiData('fetch/config_pages/have_unique_business_needs'),
    },
    {
      queryKey: 'partnerships',
      queryFn: getMultiData('fetch/terms/partnerships'),
    },
    {
      queryKey: 'certificates',
      queryFn: getMultiData('fetch/terms/certificates'),
    },
  ]);
  // {
  //   queryKey: 'footerWebform',
  //   queryFn: getMultiData('fetch/config_pages/footer_webform'),
  // },

  const isLoading = queries.some(query => query.isLoading);
  const [
    footerTop,
    footerBottom,
    startCooperation,
    startCooperationTop,
    partnerships,
    certificates,
  ] = queries.map(query => query.data);
  const currentYear = new Date().getFullYear();

  const footerRef = useRef();

  const {
    image,
    link,
    subscribe_title,
    subscribe_subtitle,
    multicolor_title: startCooperationTitle,
  } = startCooperation?.data || {};

  const {
    link: linkTop,
    multicolor_title: startCooperationTitleTop,
    description: descTop,
  } = startCooperationTop?.data || {};

  useGSAP(
    () => {
      if (title && footerTop && startCooperation) {
        gsap.from('.footer__top', {
          ease: 'power1.out',
          scrollTrigger: {
            trigger: '.footer__top',
            start: 'top+=15% bottom',
            end: 'bottom center',
          },
          duration: 1,
          y: '5vh',
          scale: 0.9,
          opacity: 0,
        });

        gsap.from('.footer__middle', {
          ease: 'power1.out',
          scrollTrigger: {
            trigger: '.footer__middle',
            start: 'top+=15% bottom',
            end: 'bottom center',
          },
          duration: 1,
          y: '5vh',
          scale: 0.9,
          opacity: 0,
        });

        gsap.from('.footer__logos', {
          ease: 'power1.out',
          scrollTrigger: {
            trigger: '.footer__logos',
            start: 'top+=15% bottom',
            end: 'bottom center',
          },
          duration: 1,
          y: '5vh',
          scale: 0.9,
          opacity: 0,
        });

        gsap.from('.footer__bottom', {
          ease: 'power1.out',
          scrollTrigger: {
            trigger: '.footer__bottom',
            start: 'top+=15% bottom',
            end: 'bottom center',
          },
          duration: 1,
          y: '3vh',
          scale: 0.9,
          opacity: 0,
        });

        gsap.from('.footer-cooperation__block', {
          ease: 'power1.out',
          scrollTrigger: {
            trigger: '.footer-cooperation__block',
            start: 'top+=15% bottom',
            end: 'bottom center',
          },
          duration: 1,
          y: '5vh',
          scale: 0.9,
          opacity: 0,
        });

        gsap.from('.footer-cooperation__image', {
          ease: 'power1.out',
          scrollTrigger: {
            trigger: '.footer-cooperation__image',
            start: 'top+=15% bottom',
            end: 'bottom bottom',
          },
          duration: 1,
          opacity: 0,
        });

        // SECTION: Start cooperation
        const startCooperation = '.start-cooperation__section';
        if (document.querySelectorAll(startCooperation).length > 0) {
          gsap.from(`${startCooperation} .container`, {
            ease: 'power1.out',
            scrollTrigger: {
              trigger: `${startCooperation} .container`,
              start: 'top+=15% bottom',
              end: 'bottom center',
            },
            duration: 1,
            y: '5vh',
            scale: 0.9,
            opacity: 0,
          });
        }
      }
    },
    {
      dependencies: [title, footerTop, startCooperation],
      scope: footerRef,
    }
  );

  // Footer Data or Page Data is still loading
  if (isLoading || nodeIsLoading) return;

  // Renders footer only after page data is loaded to prevent CLS issues
  return (
    <footer className="footer" ref={footerRef}>
      {(startCooperationTitleTop || linkTop) && (
        <StartCooperation
          data={{
            description: descTop,
            multicolor_title: startCooperationTitleTop,
            link: linkTop,
          }}
        />
      )}
      <div className="container">
        {footerTop?.data?.links && (
          <div className="footer__top">
            {footerTop.data?.links && (
              <NavFooter items={footerTop.data.links} />
            )}
          </div>
        )}
        <div className="footer__middle">
          <div className="footer__middle-left">
            <div className="footer__subscribe-block">
              {subscribe_title?.value && <h2>{subscribe_title.value}</h2>}
              {subscribe_subtitle?.value && <p>{subscribe_subtitle.value}</p>}
              <div className="footer__subscribe-form">
                <FormSubscribe />
              </div>
            </div>
          </div>
          <div className="footer__middle-right">
            <Link to={'/'} className="footer__logo">
              <LazyLoadImage
                effect="blur"
                src={'/media/logo.svg'}
                alt="Santhosh Fabricators | Logo"
                height="80px"
                width="350px"
              />
            </Link>
          </div>
        </div>
        <div className="footer__logos">
          {partnerships?.data?.length > 0 && (
            <div className="footer__logos-col partnerships">
              <h2>{'Partnerships:'}</h2>
              <div className="footer__logos-items">
                {partnerships.data.map((el, i) => (
                  <div className={`footer__logos-item ${el?.name}`} key={i}>
                    <Picture image={el?.icon?.items?.[0]} />
                  </div>
                ))}
              </div>
            </div>
          )}
          {certificates?.data?.length > 0 && (
            <div className="footer__logos-col certificates">
              <h2>{'Certificates:'}</h2>
              <div className="footer__logos-items">
                {certificates.data.map((el, i) => (
                  <div className={`footer__logos-item ${el?.name}`} key={i}>
                    <Picture image={el?.icon?.items?.[0]} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="footer__bottom">
          <div className="footer__bottom-left">
            <div className="footer__copy">
              &copy;{currentYear}
              {' Santhosh Fabricators Pvt. Ltd. - All rights reserved'}
            </div>
          </div>
          <div className="footer__bottom-right">
            <div className="footer__bottom-nav">
              {footerBottom.data?.links && (
                <nav>
                  {footerBottom.data.links?.map(link => (
                    <Button
                      className="footer__bottom-nav__link"
                      key={link?.id}
                      data={link}
                    />
                  ))}
                </nav>
              )}
              <Button
                className="btn btn-circle btn-circle-s btn-yellow  btn-scroll"
                onClick={() =>
                  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
                }
              >
                <Icon
                  icon="arrow--right"
                  className="icon--turn-up icon-arrow--up"
                  color="white"
                  height="14px"
                  width="14px"
                />
                <span className="visually-hidden">{'Scroll top'}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {(startCooperationTitle || link || image) && (
        <div className="footer__bottom-cooperation">
          <div className="container">
            <div className="footer-cooperation__block">
              {startCooperationTitle?.value && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: startCooperationTitle.value,
                  }}
                />
              )}
              {link?.items?.[0] && (
                <Button className="btn btn-secondary" data={link.items[0]}>
                  <Icon
                    icon="arrow--right"
                    color="white"
                    height="12px"
                    width="12px"
                  />
                </Button>
              )}
            </div>
          </div>
          {image?.items?.[0]?.src && (
            <div className="footer-cooperation__image">
              <Picture image={image.items[0]} />
            </div>
          )}
        </div>
      )}
      <Button
        className="btn btn-circle btn-circle-s btn-yellow btn-scroll"
        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
      >
        <Icon
          icon="arrow--right"
          className="icon--turn-up icon-arrow--up"
          color="white"
          height="14px"
          width="14px"
        />
        <span className="visually-hidden">{'Scroll top'}</span>
      </Button>
    </footer>
  );
};

export default Footer;
