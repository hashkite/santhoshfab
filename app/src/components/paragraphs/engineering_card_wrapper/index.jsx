import React, { useState, useMemo, useEffect, useRef } from 'react';
import { HtmlField } from 'shared/ui';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './engineeringCardWrapper.scss';

gsap.registerPlugin(ScrollTrigger);

const EngineeringCardWrapper = ({ data }) => {
  console.log(data,'data---engineering_card_wrapper');
  const {
    title,
    subtitle,
    cta,
    engineering_card_items,
    engineering_card_type,
    layout,
  } = data || {};

  const globalCta = cta?.items?.[0] || null;
  const cardType = engineering_card_type?.value || 'default';
  const layoutValue = layout?.value || 'three_columns';


  const items = useMemo(
    () => engineering_card_items?.items || [],
    [engineering_card_items]
  );

  // maintain local order so we can swap featured item positions
  const [itemsState, setItemsState] = useState(items);

  // For web_solution: expanded state for each card
  const [expandedCards, setExpandedCards] = useState(Array(items.length).fill(false));
  // Refs for each web_solution card list
  const listRefs = useRef([]);
  useEffect(() => {
    setItemsState(items);
    setExpandedCards(Array(items.length).fill(false)); // reset on items change
    listRefs.current = [];
  }, [items]);

  // Animate expand and collapse smoothly with GSAP
  useEffect(() => {
    expandedCards.forEach((expanded, idx) => {
      const el = listRefs.current[idx];
      if (el) {
        if (expanded) {
          gsap.to(el, { height: el.scrollHeight, opacity: 1, duration: 0.4, ease: 'power2.out', clearProps: 'height' });
        } else {
          // Set height to current pixel value before animating to 120px
          const currentHeight = el.offsetHeight;
          gsap.set(el, { height: currentHeight });
          gsap.to(el, { height: 120, opacity: 1, duration: 0.4, ease: 'power2.in' });
        }
      }
    });
  }, [expandedCards]);

  const handleWebSolutionToggle = idx => {
    setExpandedCards(prev => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  const container = useRef(null);

  useGSAP(
    () => {
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
    },
    { scope: container }
  );

  // Note: other card types use media = item.media?.items?.[0] and render <img src={media.src} />
  // We'll follow the same pattern below for consistency.

  const hyphenCardType = (cardType || '').replace(/_/g, '-');

  return (
    <div
      ref={container}
      className={`engineering_card_wrapper engineering_card_wrapper--main engineering_card_wrapper--${cardType} engineering_card_wrapper--${hyphenCardType} engineering_card_wrapper--layout-${layoutValue}`}
    >
      <div className="container">
        <div className="engineering_card_wrapper--header">
          <div className="engineering_card_wrapper--header-text">
            {/* For 'expertise' type we want subtitle as a small label above the title */}
            {cardType === 'expertise' && subtitle && (
              <HtmlField
                text={subtitle}
                Tag="span"
                className="engineering_card_wrapper--label"
              />
            )}

            {data.multicolor_title?.value ? (
              <HtmlField
                text={data.multicolor_title.value}
                Tag="h2"
                className="engineering_card_wrapper--title engineering_card_wrapper--multicolor-title"
              />
            ) : (
              title && (
                <HtmlField
                  text={title}
                  Tag="h2"
                  className="engineering_card_wrapper--title"
                />
              )
            )}

            {/* For non-expertise types keep subtitle as a paragraph under title */}
            {cardType !== 'expertise' && subtitle && (
              <HtmlField
                text={subtitle}
                Tag="p"
                className="engineering_card_wrapper--subtitle"
              />
            )}
          </div>

          {globalCta && (
            <div className="engineering_card_wrapper--header-cta">
              <a href={globalCta.url || '#'} className="link-cta">
                {globalCta.title}
                <span className="link-cta__arrow">→</span>
              </a>
            </div>
          )}
        </div>

        {/* Special layout for case study featured: unified grid with a featured item that spans 2x2 */}
        {cardType === 'case_study_featured' ? (
          <div className="case-grid">
            {itemsState.map((item, idx) => {
              const media = item.media?.items?.[0] || null;
              const isFeatured = idx === 0; // featured always at index 0 (top-left)

              const handleClick = () => {
                if (isFeatured) return;
                setItemsState(prev => {
                  const next = [...prev];
                  // swap clicked item into index 0 (featured) and move previous featured to clicked position
                  [next[0], next[idx]] = [next[idx], next[0]];
                  return next;
                });
              };

              if (isFeatured) {
                return (
                  <article
                    key={item.id || item.internal_id}
                    className="case-item featured"
                  >
                    {media && (
                      <div className="case-item__logo">
                        <img
                          src={media.src}
                          alt={media.alt || media.name || ''}
                        />
                      </div>
                    )}
                    <div className="case-item__body">
                      {item.title && (
                        <HtmlField
                          text={item.title}
                          Tag="h3"
                          className="case-item__title"
                        />
                      )}
                      {item.description && (
                        <HtmlField
                          text={item.description}
                          Tag="div"
                          className="case-item__description"
                        />
                      )}
                    </div>
                    {item.cta?.items?.[0] && (
                      <div className="case-item__cta">
                        <a
                          href={item.cta.items[0].url || '#'}
                          className="link-cta"
                        >
                          {item.cta.items[0].title}
                        </a>
                      </div>
                    )}
                  </article>
                );
              }

              return (
                <button
                  key={item.id || item.internal_id}
                  type="button"
                  onClick={handleClick}
                  className={`case-item ${isFeatured ? 'featured' : 'small'}`}
                >
                  <div className="case-item__logo">
                    {media && (
                      <img
                        src={media.src}
                        alt={media.alt || media.name || ''}
                      />
                    )}
                  </div>
                  <div className="case-item__meta">
                    {item.title && (
                      <HtmlField
                        text={item.title}
                        Tag="span"
                        className="case-item__title-small"
                      />
                    )}
                    {item.description && (
                      <HtmlField
                        text={item.description}
                        Tag="span"
                        className="case-item__desc-small"
                      />
                    )}
                  </div>
                  <span className="case-item__plus">+</span>
                </button>
              );
            })}
          </div>
        ) : cardType === 'case_study_classic' ? (
          // Render case studies as a single-column list where each row alternates media/content
          <div className="case-study--classic-list">
            {items.map((it, idx) => {
              const key = it?.id || it?.internal_id || idx;
              const media = it?.media?.items?.[0] || null;
              const bg = it?.color?.value ? (it.color.value.startsWith('#') ? it.color.value : `#${it.color.value}`) : undefined;
              const isReverse = idx % 2 === 1;

              return (
                <article
                  className={`case-study-row ${isReverse ? 'case-study-row--reverse' : ''}`}
                  key={key}
                  style={bg ? { ['--card-bg']: bg } : undefined}
                >
                  <div className="case-study-row__media">
                    {media && media.src ? (
                      <img src={media.src} alt={media.alt || media.name || ''} />
                    ) : (
                      <div className="case-study-row__media--placeholder" />
                    )}
                  </div>

                  <div className="case-study-row__content">
                    {/* optional small label e.g. 'Case Study' if present on the item */}
                    {it?.label && (
                      <div className="case-study-row__label">
                        <HtmlField text={it.label} Tag="span" />
                      </div>
                    )}

                    {it.title && (
                      <div className="case-study-row__title">
                        <HtmlField text={it.title} Tag="h3" />
                      </div>
                    )}

                    {it.description && (
                      <div className="case-study-row__description">
                        <HtmlField text={it.description} Tag="div" />
                      </div>
                    )}

                    {it.cta?.items?.[0] && (
                      <div className="case-study-row__cta">
                        <a href={it.cta.items[0].url || '#'} className="link-cta">
                          {it.cta.items[0].title}
                          <span className="link-cta__arrow">→</span>
                        </a>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : cardType === 'methodology' ? (
          <div className="engineering_card_wrapper--grid methodology">
            {items.map((item, idx) => {
              const key = item?.id || item?.internal_id || idx;
              const media = item?.media?.items?.[0] || null;
              const itemCta = item?.cta?.items?.[0] || null;

              return (
                <div className="methodology-card" key={key}>
                  {media && media.src ? (
                    <div
                      className="methodology-card__bg"
                      style={{ backgroundImage: `url(${media.src})` }}
                    />
                  ) : (
                    <div className="methodology-card__bg methodology-card__bg--empty" />
                  )}
                  <div className="methodology-card__overlay" />
                  <div className="methodology-card__eye" aria-hidden>
                    <svg width="24" height="24" fill="none">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="#222"
                        strokeWidth="2"
                      />
                      <circle cx="12" cy="12" r="4" fill="#222" />
                    </svg>
                  </div>
                  <div className="methodology-card__content">
                    {item?.title && (
                      <HtmlField
                        text={item.title}
                        Tag="div"
                        className="methodology-card__title"
                      />
                    )}
                    {item?.description && (
                      <HtmlField
                        text={item.description}
                        Tag="div"
                        className="methodology-card__desc"
                      />
                    )}
                    {itemCta && (
                      <a
                        href={itemCta.url || '#'}
                        className="methodology-card__cta"
                      >
                        {itemCta.title} <span>→</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : cardType === 'web_solution' ? (
          <div className="engineering_card_wrapper--grid web_solution">
            {items.map((item, idx) => {
              const key = item?.id || item?.internal_id || idx;
              const media = item?.media?.items?.[0] || null;
              const itemCta = item?.cta?.items?.[0] || null;
              // Parse the HTML list in description.value
              let links = [];
              if (item?.description?.value) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = item.description.value;
                const ul = tempDiv.querySelector('ul');
                if (ul) {
                  links = Array.from(ul.children).map((li, i) => {
                    const a = li.querySelector('a');
                    if (a) {
                      return (
                        <li key={i}>
                          <a href={a.getAttribute('href')} target="_blank" rel="noopener noreferrer">{a.textContent}</a>
                        </li>
                      );
                    }
                    return <li key={i}>{li.textContent}</li>;
                  });
                }
              }
              const showAll = expandedCards[idx];
              const visibleLinks = showAll ? links : links.slice(0, 3);
              return (
                <div className="web-solution-card" key={key}>
                  {media && media.src && (
                    <div className="web-solution-card__icon">
                      <img src={media.src} alt={media.alt || media.name || ''} width={media.width || 48} height={media.height || 48} />
                    </div>
                  )}
                  {item?.title?.value && (
                    <div className="web-solution-card__title">
                      {itemCta && itemCta.url ? (
                        <a href={itemCta.url} target={itemCta.external ? '_blank' : undefined} rel={itemCta.external ? 'noopener noreferrer' : undefined}>
                          <strong>{item.title.value}</strong>
                        </a>
                      ) : (
                        <strong>{item.title.value}</strong>
                      )}
                    </div>
                  )}
                  {links.length > 0 && (
                    <ul
                      className={`web-solution-card__list${showAll ? ' expanded' : ' collapsed'}`}
                      ref={el => (listRefs.current[idx] = el)}
                      style={{
                        overflow: 'hidden',
                        opacity: 1,
                        transition: 'none',
                        paddingBottom: '18px',
                        marginBottom: 0
                      }}
                    >
                      {visibleLinks}
                    </ul>
                  )}
                  {links.length > 3 && (
                    <div className="web-solution-card__cta">
                      <button
                        type="button"
                        className="web-solution-card__plus"
                        aria-label={showAll ? 'Show less' : 'Show more'}
                        onClick={() => handleWebSolutionToggle(idx)}
                      >
                        {showAll ? '-' : '+'}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : cardType === 'industry_grid' ? (
          <div className="engineering_card_wrapper--grid industry-grid">
            {items.map((item, idx) => {
              const key = item?.id || item?.internal_id || idx;
              const media = item?.media?.items?.[0] || null;
              const itemCta = item?.cta?.items?.[0] || null;
              const href = itemCta?.url || '#';
              const src = media?.src || media?.url || media?.file?.url || media?.image?.items?.[0]?.src || '';

              return (
                <a
                  className="industry-card"
                  key={key}
                  href={href}
                  target={itemCta?.external ? '_blank' : undefined}
                  rel={itemCta?.external ? 'noopener noreferrer' : undefined}
                >
                  <div className="industry-card__media">
                    {(() => {
                      const s = media?.src || media?.url || media?.file?.url || media?.image?.items?.[0]?.src || '';
                      return s ? <img src={s} alt={media?.alt || item?.title?.value || ''} /> : <div className="industry-card__placeholder" />;
                    })()}
                  </div>
                  <div className="industry-card__title">{item?.title?.value || item?.title || ''}</div>
                  <div className="industry-card__arrow" aria-hidden>↗</div>
                </a>
              );
            })}
          </div>
        ) : cardType === 'featured' ? (
          <div className="engineering_card_wrapper--grid featured-grid">
            {items.map((item, idx) => {
              const key = item?.id || item?.internal_id || idx;
              const media = item?.media?.items?.[0] || null;
              const titleText = item?.title?.value || item?.title || '';
              const desc = item?.description?.value || '';
              const src = media?.src || media?.url || media?.file?.url || media?.image?.items?.[0]?.src || '';

              return (
                <div className="featured-card" key={key}>
                  <div className="featured-card__icon">
                    {(() => {
                      const s = media?.src || media?.url || media?.file?.url || media?.image?.items?.[0]?.src || '';
                      return s ? <img src={s} alt={media?.alt || titleText} /> : null;
                    })()}
                  </div>
                  <div className="featured-card__title">
                    {item?.cta?.items?.[0]?.url ? (
                      <a href={item.cta.items[0].url} target={item.cta.items[0].external ? '_blank' : undefined} rel={item.cta.items[0].external ? 'noopener noreferrer' : undefined}>
                        <strong>{titleText}</strong>
                      </a>
                    ) : (
                      <strong>{titleText}</strong>
                    )}
                  </div>
                  {desc && (
                    <div className="featured-card__desc" dangerouslySetInnerHTML={{ __html: desc }} />
                  )}
                </div>
              );
            })}
          </div>
        ) : cardType === 'audience' ? (
          <div className="engineering_card_wrapper--grid audience">
            {items.map((item, idx) => {
              const key = item?.id || item?.internal_id || idx;
              const itemCta = item?.cta?.items?.[0] || null;
              return (
                <div className="audience-card" key={key}>
                  <div className="audience-card__top-border" />
                  <div className="audience-card__content">
                    {item?.title?.value && (
                      <div className="audience-card__title">
                        {itemCta && itemCta.url ? (
                          <a href={itemCta.url} target={itemCta.external ? '_blank' : undefined} rel={itemCta.external ? 'noopener noreferrer' : undefined} style={{ color: 'inherit', textDecoration: 'underline' }}>
                            <strong>{item.title.value}</strong>
                          </a>
                        ) : (
                          <strong>{item.title.value}</strong>
                        )}
                      </div>
                    )}
                    {item?.description?.value && (
                      <div
                        className="audience-card__desc"
                        dangerouslySetInnerHTML={{
                          __html: item.description.value,
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : cardType === 'costing' ? (
          <div className="engineering_card_wrapper--grid costing-grid">
            {/* Render the costing items in left two columns; final CTA is static */}
            {items.map((item, idx) => {
              const key = item?.id || item?.internal_id || idx;
              const media = item?.media?.items?.[0] || null;
              const desc = item?.description?.value || '';
              const titleText = item?.title?.value || item?.title || '';
              const src = media?.src || media?.url || media?.file?.url || '';

              return (
                <div className="costing-card" key={key}>
                  <div className="costing-card__media">
                    {(() => {
                      const s = media?.src || media?.url || media?.file?.url || media?.image?.items?.[0]?.src || '';
                      return s ? <img src={s} alt={media?.alt || titleText} /> : null;
                    })()}
                  </div>
                  <div className="costing-card__title">{titleText}</div>
                  {desc && <div className="costing-card__desc" dangerouslySetInnerHTML={{ __html: desc }} />}
                </div>
              );
            })}

            {/* Static CTA card placed as the last column spanning two rows */}
            <div className="costing-cta">
              <div className="costing-cta__inner">
                <h3>Want to know how much your web application will cost?</h3>
                <p>Our team will be happy to provide a cost estimate for your case.</p>
                <a className="costing-cta__button" href="#">Calculate the cost</a>
              </div>
            </div>
          </div>
        ) : (
          <div className="engineering_card_wrapper--grid">
            {items.map(item => {
              const media = item.media?.items?.[0] || null;
              const itemCta = item.cta?.items?.[0] || null;

              // helper to render either image or video depending on media
              const renderMedia = (m, props = {}) => {
                if (!m) return null;
                const src = m.src || m.url || m.file?.url;
                const mime = m.mime || m.type || (src && src.split('.').pop());
                const isVideo =
                  (mime && String(mime).toLowerCase().includes('video')) ||
                  (typeof src === 'string' && /\.(mp4|webm|ogg)$/i.test(src));

                if (isVideo) {
                  return (
                    <video
                      className={props.className}
                      src={src}
                      muted
                      playsInline
                      loop
                      autoPlay
                      aria-hidden
                    />
                  );
                }

                return (
                  <img
                    className={props.className}
                    src={src}
                    alt={m.alt || m.name || ''}
                  />
                );
              };

              if (cardType === 'expertise') {
                // Vertical / icon-above layout
                return (
                  <div
                    className="engineering_card_wrapper--card expertise"
                    key={item.id || item.internal_id}
                  >
                    {media && (
                      <div className="card__icon">
                        {renderMedia(media, { className: '' })}
                      </div>
                    )}

                    <div className="card__content">
                      {item.title && (
                        <HtmlField
                          text={item.title}
                          Tag="h3"
                          className="card__title"
                        />
                      )}

                      {item.description && (
                        <HtmlField
                          text={item.description}
                          Tag="p"
                          className="card__description"
                        />
                      )}

                      {itemCta && (
                        <a href={itemCta.url || '#'} className="card__link">
                          {itemCta.title}
                        </a>
                      )}
                    </div>
                  </div>
                );
              }
              // Engagement layout: boxed card with media on top and content below (three-column hero cards)
              if (cardType === 'engagement') {
                return (
                  <article
                    className="engineering_card_wrapper--card engagement"
                    key={item.id || item.internal_id}
                  >
                    {media && (
                      <div className="card__media">
                        {renderMedia(media, { className: 'card__media-el' })}
                      </div>
                    )}

                    <div className="card__content">
                      {item.title && (
                        <HtmlField
                          text={item.title}
                          Tag="h3"
                          className="card__title"
                        />
                      )}

                      {item.description && (
                        <HtmlField
                          text={item.description}
                          Tag="div"
                          className="card__description"
                        />
                      )}

                      {itemCta && (
                        <a href={itemCta.url || '#'} className="card__link">
                          {itemCta.title}
                        </a>
                      )}
                    </div>
                  </article>
                );
              }

              // Default (horizontal) card
              return (
                <div
                  className="engineering_card_wrapper--card"
                  key={item.id || item.internal_id}
                >
                  {media && (
                    <div className="card__icon">
                      {renderMedia(media, { className: '' })}
                    </div>
                  )}

                  <div className="card__content">
                    {item.title && (
                      <HtmlField
                        text={item.title}
                        Tag="h3"
                        className="card__title"
                      />
                    )}

                    {item.description && (
                      <HtmlField
                        text={item.description}
                        Tag="p"
                        className="card__description"
                      />
                    )}

                    {itemCta && (
                      <a href={itemCta.url || '#'} className="card__link">
                        {itemCta.title}
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EngineeringCardWrapper;
