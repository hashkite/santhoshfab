import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getData } from '../../../shared/api';
import FaqAccordion from '../../elements/faq-accordion';

import './faq.scss';

gsap.registerPlugin(ScrollTrigger);

const Faq = ({ data, type }) => {
  const container = useRef(null);
  
  // If data prop is passed (from paragraph), use it
  console.log(data, '==============faq data=========');

  // Handle paragraph data - check for common field names
  // Could be: faq_items, paragraphs, faq_paragraphs, faq, etc.
  let items = [];
  let title = null;
  let fallbackTitle = null;
  let fallbackItems = [];

  if (data) {
    items = 
      data.faq?.items || 
      data.faq_items?.items || 
      data.paragraphs?.items || 
      data.faq_paragraphs?.items ||
      data.items ||
      [];
    
    title = data.title;
  }

  // Fallback to config pages data if no paragraph data
  if (!items || items.length === 0) {
    const { data: faqsSubService } = getData('fetch/config_pages/faqs');
    const { data: faqsTalent } = getData('fetch/config_pages/faq_s');
    const faq = type === 'talent' ? faqsTalent : faqsSubService;

    fallbackTitle = faq?.data?.title;
    fallbackItems = faq?.data?.paragraphs?.items || [];
    items = fallbackItems;
  }

  const displayTitle = title || fallbackTitle;
  const displayItems = items || [];

  // GSAP Animation on scroll
  useGSAP(
    () => {
      if (container.current && displayItems.length > 0) {
        gsap.from(container.current, {
          opacity: 0,
          y: 40,
          ease: 'power1.out',
          duration: 0.8,
          scrollTrigger: {
            trigger: container.current,
            start: 'top bottom',
            end: 'center top',
          },
        });
      }
    },
    { dependencies: [displayItems], scope: container }
  );

  // If we have items, render accordion
  if (displayItems && displayItems.length > 0) {
    return (
      <div className="faq__section" ref={container}>
        <div className="container">
          {displayTitle?.value && (
            <div className="faq__header">
              <h2>{displayTitle?.value}</h2>
            </div>
          )}
          <FaqAccordion items={displayItems} />
        </div>
      </div>
    );
  }

  return;
};

export default Faq;
