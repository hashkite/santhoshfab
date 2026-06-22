import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { usePageContext } from '../../../app/context/page';
import { getNodeData, usedTransformedLocation } from '../../../shared/api';
import { useGoogleAnalytics } from '../../../shared/hooks/useGoogleAnalytics';
import { Loading } from '../../../shared/ui';
import Paragraphs from '../../layout/paragraphs';
import { Article, Faq } from '../../paragraphs';
import NotFound from '../not-found';
import SubService from '../sub-service';
import { RevenueChart } from '../../elements';

gsap.registerPlugin(ScrollTrigger);

const ScrollToTop = () => {
  window.scrollTo(0, 0);
  return null;
};

const Page = ({ setIsAdmin, setTitle, setNodeIsLoading }) => {
  const pathname = usedTransformedLocation();
  const { data: node, isLoading, isError } = getNodeData(pathname);
  const nodeData = node?.data || {};
  const { is_admin, title, breadcrumbs, node_type, node_id } = nodeData;
  const { setBreadcrumbs } = usePageContext();
  const page = useRef();

  const servicesPaths = [
    '/services/emerging-tech',
    '/services/engineering',
    '/services/transform',
    '/services/optimize',
    '/services/design',
    '/services/platforms',
  ];

  const navigate = useNavigate();

  useGoogleAnalytics();

  useEffect(() => {
    setIsAdmin(is_admin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [is_admin]);

  useEffect(() => {
    setNodeIsLoading(isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (breadcrumbs) setBreadcrumbs(breadcrumbs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breadcrumbs]);

  useEffect(() => {
    if (title) {
      setTitle(title);
      document.title = title;
    }
    ScrollToTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  useGSAP(
    () => {
      // SECTION: Business Needs
      const businessNeeds = '.business-needs__section';
      if (document.querySelectorAll(businessNeeds).length > 0) {
        gsap.from(`${businessNeeds} h2`, {
          ease: 'power1.out',
          scrollTrigger: {
            trigger: `${businessNeeds} h2`,
            start: 'top bottom',
            end: 'bottom center',
          },
          duration: 1,
          x: '-5vw',
          scale: 0.9,
          opacity: 0,
        });

        document
          .querySelectorAll('.business-needs__item')
          .forEach((item, index) => {
            gsap.from(item, {
              ease: 'power1.out',
              scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom center',
              },
              duration: 1,
              delay: index ? index / 3 : 0,
              y: '3vh',
              scale: 0.9,
              opacity: 0,
            });
          });
      }

      // SECTION: Scrollable Items
      const scrollableItems = '.scrollable-items__section';

      function scrollableItemsToggleNav(scrollableItems, index) {
        document
          .querySelectorAll(`${scrollableItems} .scrollable-items__nav-item`)
          .forEach(item => {
            item.classList.remove('selected');
          });
        document
          .querySelectorAll(`${scrollableItems} .scrollable-items__nav-item`)
          ?.[index]?.classList.add('selected');
      }

      if (document.querySelectorAll(scrollableItems).length > 0) {
        gsap.from(scrollableItems, {
          ease: 'power1.out',
          scrollTrigger: {
            trigger: scrollableItems,
            start: 'top bottom',
            end: 'bottom center',
          },
          duration: 1,
          y: '5vh',
          opacity: 0,
        });

        document
          .querySelectorAll('.scrollable-item__text-block')
          .forEach((item, index) => {
            gsap.from(
              document.querySelectorAll('.scrollable-item__image')[index],
              {
                ease: 'linear',
                scrollTrigger: {
                  trigger: item,
                  scrub: 2,
                  start: window.innerWidth < 768 ? 'top bottom' : 'top center',
                  end:
                    window.innerWidth < 768 ? 'bottom bottom' : 'center center',
                  onEnter: () =>
                    scrollableItemsToggleNav(scrollableItems, index),
                  onEnterBack: () =>
                    scrollableItemsToggleNav(scrollableItems, index),
                },
                duration: index > 0 ? 1 : 0,
                scale: 0.9,
                opacity: 0,
              }
            );
          });
      }

      // SECTION: Horizontal Tabs
      const horizontalTabs = '.horizontal-tabs__section';
      if (document.querySelectorAll(horizontalTabs).length > 0) {
        const horizontalTabsDecor = '.horizontal-tabs__decor';
        document.querySelectorAll(horizontalTabsDecor).forEach(item => {
          gsap.from(item.querySelector('svg'), {
            ease: 'linear',
            scrollTrigger: {
              trigger: item,
              scrub: 2,
              start: 'top bottom',
              end: 'center center',
            },
            scaleY: 0,
          });
        });

        gsap.from(`${horizontalTabs} .horizontal-tabs__content`, {
          ease: 'power1.out',
          scrollTrigger: {
            trigger: `${horizontalTabs} .horizontal-tabs__content`,
            start: 'top+=15% bottom',
            end: 'bottom center',
          },
          duration: 1,
          x: '-5vw',
          scale: 0.9,
          opacity: 0,
        });

        gsap.from(`${horizontalTabs} .horizontal-tabs__bg`, {
          ease: 'power1.out',
          scrollTrigger: {
            trigger: `${horizontalTabs} .horizontal-tabs__bg`,
            start: 'top+=15% bottom',
            end: 'bottom center',
          },
          duration: 1,
          y: '5vh',
          scale: 0.9,
          opacity: 0,
        });
      }

      // SECTION: Our Footprints
      const ourFootprints = '.our-footprints__section';
      if (document.querySelectorAll(ourFootprints).length > 0) {
        const ourFootprintsDecor = '.our-footprints__decor';
        document.querySelectorAll(ourFootprintsDecor).forEach(item => {
          gsap.from(item.querySelector('svg'), {
            ease: 'linear',
            scrollTrigger: {
              trigger: item,
              scrub: 2,
              start: 'top bottom',
              end: 'center center',
            },
            scaleY: 0,
          });
        });

        gsap.from(`${ourFootprints} .our-footprints__top-content`, {
          ease: 'power1.out',
          scrollTrigger: {
            trigger: `${ourFootprints} .our-footprints__top-content`,
            start: 'top+=15% bottom',
            end: 'bottom center',
          },
          duration: 1,
          y: '5vh',
          scale: 0.9,
          opacity: 0,
        });

        if (
          document.querySelectorAll(
            `${ourFootprints} .our-footprints__countries`
          ).length > 0
        ) {
          gsap.from(`${ourFootprints} .our-footprints__countries`, {
            ease: 'power1.out',
            scrollTrigger: {
              trigger: `${ourFootprints} .our-footprints__countries`,
              start: 'top+=15% bottom',
              end: 'bottom center',
            },
            duration: 1,
            y: '5vh',
            scale: 0.9,
            opacity: 0,
          });
        }

        gsap.from(`${ourFootprints} .our-footprints__bottom-content`, {
          ease: 'power1.out',
          scrollTrigger: {
            trigger: `${ourFootprints} .our-footprints__bottom-content`,
            start: 'top+=15% bottom',
            end: 'bottom center',
          },
          duration: 1,
          y: '5vh',
          scale: 0.9,
          opacity: 0,
        });
      }

      // SECTION: Client Impact
      const clientImpact = '.tabs__section';
      if (document.querySelectorAll(clientImpact).length > 0) {
        gsap.from(`${clientImpact} .tabs__header`, {
          ease: 'power1.out',
          scrollTrigger: {
            trigger: `${clientImpact} .tabs__header`,
            start: 'top+=15% bottom',
            end: 'bottom center',
          },
          duration: 1,
          x: '-5vw',
          scale: 0.9,
          opacity: 0,
        });

        gsap.from(`${clientImpact} .client-impact-carousel__swiper`, {
          ease: 'power1.out',
          scrollTrigger: {
            trigger: `${clientImpact} .client-impact-carousel__swiper`,
            start: 'top+=15% bottom',
            end: 'bottom center',
          },
          duration: 1,
          y: '5vh',
          scale: 0.9,
          opacity: 0,
        });

        gsap.from(`${clientImpact} .client-impact-carousel__swiper-thumbs`, {
          ease: 'power1.out',
          scrollTrigger: {
            trigger: `${clientImpact} .client-impact-carousel__swiper-thumbs`,
            start: 'top+=15% bottom',
            end: 'bottom center',
          },
          duration: 1,
          delay: 0.3,
          y: '5vh',
          scale: 0.9,
          opacity: 0,
        });
      }

      // SECTION: View Case Studies
      const viewSection = '.view__section';
      if (document.querySelectorAll(viewSection).length > 0) {
        document.querySelectorAll(viewSection).forEach(section => {
          gsap.from(section.querySelector(`.view__header`), {
            ease: 'power1.out',
            scrollTrigger: {
              trigger: section.querySelector(`.view__header`),
              start: 'top+=15% bottom',
              end: 'bottom center',
            },
            duration: 1,
            y: '3vh',
            scale: 0.9,
            opacity: 0,
          });

          gsap.from(section.querySelector(`.view__content`), {
            ease: 'power1.out',
            scrollTrigger: {
              trigger: section.querySelector(`.view__content`),
              start: 'top+=15% bottom',
              end: 'bottom center',
            },
            duration: 1,
            y: '5vh',
            scale: 0.9,
            opacity: 0,
          });
        });
      }
    },
    { dependencies: [title], scope: page }
  );

  // Check if the path is a sub-service path
  if (servicesPaths.includes(pathname)) {
    // Extract the sub-service part and redirect with a hash
    const subService = pathname.split('/')[2];
    navigate(`/services#${subService}`);
    return;
  }

  if (isLoading) return <Loading />;

  if (isError) return <NotFound />;
  return (
    <>
      <div ref={page}>
        {is_admin && (
          <a className="node-edit" href={`/node/${node?.data?.node_id}/edit`}>
            {'Edit page'}
          </a>
        )}
        {nodeData.header && <Paragraphs paragraphs={nodeData.header} />}
        {nodeData?.hero && (
          <Paragraphs
            author={nodeData?.author}
            title={nodeData?.title}
            technologies={nodeData?.technologies}
            sub_service={nodeData?.sub_service}
            date={nodeData?.date}
            paragraphs={nodeData.hero}
            paragraph={nodeData?.paragraph}
            node_type={nodeData?.tags}
          />
        )}
        {nodeData && node_type === 'article' && <Article data={nodeData} />}
        {nodeData && (node_type === 'revenue_growth' || node_type === 'paid_performance_marketing') && (
          
          <Paragraphs
            node_id={node_id}
            paragraphs={nodeData.marketing_paragrapghs}
          />
        )}
        {nodeData && (node_type === 'product_engineering' ||node_type === 'web_mobile') && (
          <Paragraphs
            node_id={node_id}
            paragraphs={nodeData.engineering_main}
          />
        )}
        {nodeData?.paragraphs && (
          <Paragraphs node_id={node_id} paragraphs={nodeData.paragraphs} />
        )}
        {node_type === 'sub_service' && <SubService node_id={node_id} />}
        {(node_type === 'talent' || node_type === 'sub_service') && (
          <Faq type={node_type} />
        )}
      </div>
    </>
  );
};

export default Page;
