import React, { useMemo, useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './matricsSlider.scss';

// ...existing code...
const MatricsSlider = ({ data }) => {
  // console.log(data, 'matirics slider data');

  const items = useMemo(() => data?.matrics_slider_items?.items || [], [data]);
  const gallery = useMemo(() => data?.media_gallery?.items || [], [data]);
  const title = data?.title?.value || '';

  // thumbnail window start (show max 3 thumbs). big image is the 4th in window
  const [thumbStart, setThumbStart] = useState(0);

  // modal for metric details
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMetricIndex, setActiveMetricIndex] = useState(0);

  const mainImgRef = useRef(null);
  const thumbsRef = useRef(null);
  const [imgAnimating, setImgAnimating] = useState(false);
  const [isSliding, setIsSliding] = useState(null); // 'next' | 'prev' | null
  useEffect(() => {
    // ensure thumbStart in bounds when gallery changes
    if (!gallery || gallery.length === 0) return;
    if (thumbStart >= gallery.length) setThumbStart(0);
  }, [gallery, thumbStart]);

  // set initial window so the big image shows the first gallery item by default
  // i.e. big = gallery[(thumbStart + 3) % len] -> we want that to be index 0
  const initializedRef = useRef(false);
  useEffect(() => {
    if (initializedRef.current) return;
    if (!gallery || gallery.length === 0) return;
    // default initial window: show first three as small and fourth as big
    // i.e. small0 small1 small2 big3 -> thumbStart = 0
    setThumbStart(0);
    initializedRef.current = true;
  }, [gallery]);

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') setIsModalOpen(false);
      if (e.key === 'ArrowRight') setThumbStart(s => (s + 1) % gallery.length);
      if (e.key === 'ArrowLeft') setThumbStart(s => (s - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [gallery.length]);

  // animate image on thumbStart (window) change -> big image will change
  useEffect(() => {
    if (!gallery || gallery.length === 0) return;
    setImgAnimating(true);
    const t = setTimeout(() => setImgAnimating(false), 520);
    return () => clearTimeout(t);
  }, [thumbStart, gallery.length, gallery]);

  const openMetricModal = idx => {
    setActiveMetricIndex(idx);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const animateSwap = (direction) => {
    if (!gallery || gallery.length <= 1) return;
    const thumbsEl = thumbsRef.current;
    const mainImgEl = mainImgRef.current?.querySelector('img');
    if (!thumbsEl || !mainImgEl) return;

    // compute indices
  const len = gallery.length;
  // targetThumbOffset: rightmost visible thumb (offset 2)

    const thumbButtons = Array.from(thumbsEl.querySelectorAll('.matrics-slider__thumb'));
    const bigRect = mainImgEl.getBoundingClientRect();

    // helper to create and style a clone image element
    const makeClone = (imgEl, rect) => {
      const clone = imgEl.cloneNode(true);
      Object.assign(clone.style, {
        position: 'fixed',
        left: `${rect.left}px`,
        top: `${rect.top}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        zIndex: 2000,
        objectFit: 'cover'
      });
      document.body.appendChild(clone);
      return clone;
    };

    setIsSliding(direction);
    setImgAnimating(true);

    const tl = gsap.timeline({ defaults: { ease: 'power2.inOut', duration: 0.52 } });

    if (direction === 'prev') {
      // PREV: incoming image (to become big) comes from right; current big morphs into rightmost small
      const slotThumb = thumbButtons[2];
      const slotImg = slotThumb ? slotThumb.querySelector('img') : null;
      const slotRect = slotImg ? slotImg.getBoundingClientRect() : null;

      // incoming index is the item after the rightmost slot
      const incomingIndex = (thumbStart + 4) % len;
      const incomingSrc = gallery[incomingIndex]?.src;

      const cloneBig = makeClone(mainImgEl, bigRect);
      let cloneIncoming;
      if (slotRect) {
        // position incoming just to the right of the slot
        const gap = 10;
        const startRect = { left: slotRect.left + slotRect.width + gap, top: slotRect.top, width: slotRect.width, height: slotRect.height };
        const incomingImg = document.createElement('img');
        incomingImg.src = incomingSrc || '';
        Object.assign(incomingImg.style, {
          position: 'fixed',
          left: `${startRect.left}px`,
          top: `${startRect.top}px`,
          width: `${startRect.width}px`,
          height: `${startRect.height}px`,
          zIndex: 2000,
          objectFit: 'cover'
        });
        document.body.appendChild(incomingImg);
        cloneIncoming = incomingImg;
      } else {
        cloneIncoming = makeClone(mainImgEl, bigRect);
      }

      // hide originals
      mainImgEl.style.visibility = 'hidden';
      if (slotImg) slotImg.style.visibility = 'hidden';

      // animate incoming -> big and big -> slot
      if (slotRect) {
        tl.to(cloneIncoming, { left: bigRect.left, top: bigRect.top, width: bigRect.width, height: bigRect.height }, 0);
        tl.to(cloneBig, { left: slotRect.left, top: slotRect.top, width: slotRect.width, height: slotRect.height }, 0);
      } else {
        tl.to(cloneIncoming, { left: bigRect.left, top: bigRect.top, width: bigRect.width, height: bigRect.height }, 0);
      }

      tl.add(() => {
        cloneBig.remove();
        if (cloneIncoming && cloneIncoming.parentNode) cloneIncoming.remove();
        mainImgEl.style.visibility = '';
        if (slotImg) slotImg.style.visibility = '';
        setImgAnimating(false);
        setIsSliding(null);
        setThumbStart(s => (s + 1) % len);
      });
    } else {
      // direction === 'next'
      // target slot is the rightmost visible thumbnail (offset 2)
      const slotThumb = thumbButtons[2];
      const slotRect = slotThumb ? slotThumb.querySelector('img').getBoundingClientRect() : null;

      // incoming image index (the one that will become big)
      const incomingIndex = (thumbStart + 4) % len;
      const incomingSrc = gallery[incomingIndex]?.src;

      // create clone of big and clone for incoming (position incoming to the right of slot)
      // NEXT: rightmost thumbnail becomes big; current big exits to right
      const targetThumb = thumbButtons[2];
      if (!targetThumb) return;
      const thumbImg = targetThumb.querySelector('img');
      const thumbRect = thumbImg.getBoundingClientRect();

      const cloneThumb = makeClone(thumbImg, thumbRect);
      const cloneBig = makeClone(mainImgEl, bigRect);

      // hide originals
      thumbImg.style.visibility = 'hidden';
      mainImgEl.style.visibility = 'hidden';

      // animate thumb -> big and big -> offscreen right
      const offRight = bigRect.left + bigRect.width + 60;
      tl.to(cloneThumb, { left: bigRect.left, top: bigRect.top, width: bigRect.width, height: bigRect.height }, 0);
      tl.to(cloneBig, { left: offRight, top: bigRect.top, opacity: 0 }, 0);

      tl.add(() => {
        cloneThumb.remove();
        cloneBig.remove();
        thumbImg.style.visibility = '';
        mainImgEl.style.visibility = '';
        setImgAnimating(false);
        setIsSliding(null);
        setThumbStart(s => (s - 1 + len) % len);
      });
    }
  };

  const prevMain = () => animateSwap('prev');
  const nextMain = () => animateSwap('next');

  // (helpers kept if we want programmatic control elsewhere)

  return (
    <section className="matrics-slider">

      <div className="container matrics-slider__container">
      {title && <h2 className="matrics-slider__title">{title}</h2>}
        <div className="matrics-slider__wrap">
        {/* left column: metric boxes + thumbnails */}
        <div className="matrics-slider__left">
          <div className="matrics-slider__grid">
            {items.map((it, idx) => {
              const number = it?.number?.value || '';
              const t = it?.title?.value || '';
              // optional preview color for box bg
              const bg = it?.color?.value ? `#${it.color.value.replace('#', '')}` : undefined;
              return (
                <button
                  key={it.id || idx}
                  className="matrics-slider__box"
                  onClick={() => openMetricModal(idx)}
                  style={bg ? { background: bg } : {}}
                  aria-label={`Open ${t}`}
                >
                  <div className="matrics-slider__box-number">{number}</div>
                  <div className="matrics-slider__box-title">{t}</div>
                  <span className="matrics-slider__box-icon" aria-hidden>↗</span>
                </button>
              );
            })}
          </div>

          {/* thumbnails row (media_gallery small previews) */}
          {gallery && gallery.length > 0 && (
            <div className="matrics-slider__thumbs-wrap">
              <div ref={thumbsRef} className={`matrics-slider__thumbs ${isSliding ? `is-sliding-${isSliding}` : ''}`}>
                {Array.from({ length: Math.min(3, gallery.length) }).map((_, offset) => {
                  // show three small images (left-to-right): thumbStart, thumbStart+1, thumbStart+2
                  const gi = (thumbStart + offset) % gallery.length;
                  const g = gallery[gi];
                  return (
                    <button
                      key={g.src || gi}
                      className={`matrics-slider__thumb`}
                      onClick={() => setThumbStart((gi - 3 + gallery.length) % gallery.length)}
                      aria-label={`Show image ${gi + 1}`}
                    >
                      <img src={g.src} alt={g.alt || `thumb-${gi}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* right column: large slide */}
        <div className="matrics-slider__right">
          {gallery && gallery.length > 0 ? (
            <div className="matrics-slider__main">
              <button className="matrics-slider__nav prev" onClick={prevMain} aria-label="Previous image">‹</button>
              <div className={`matrics-slider__image-wrap ${imgAnimating ? 'img-animating' : ''} ${isSliding ? `sliding-${isSliding}` : ''}`} ref={mainImgRef}>
                <img
                  className="matrics-slider__image"
                  src={gallery[(thumbStart + 3) % gallery.length].src}
                  alt={gallery[(thumbStart + 3) % gallery.length].alt || `image-${(thumbStart + 3) % gallery.length}`}
                />
              </div>
              <button className="matrics-slider__nav next" onClick={nextMain} aria-label="Next image">›</button>
            </div>
          ) : (
            <div className="matrics-slider__placeholder">No images</div>
          )}
        </div>
        </div>
      </div>

      {/* Metric detail modal */}
      {isModalOpen && items[activeMetricIndex] && (
        <div className="matrics-slider__modal" role="dialog" aria-modal="true">
          <div
            className="matrics-slider__modal-backdrop"
            onClick={closeModal}
            role="button"
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') closeModal(); }}
          />
          <div className="matrics-slider__modal-content" role="document">
            <button className="matrics-slider__modal-close" onClick={closeModal} aria-label="Close">✕</button>
            <div className="matrics-slider__modal-inner">
              <div className="matrics-slider__modal-number">
                {items[activeMetricIndex]?.number?.value}
              </div>
              <h3 className="matrics-slider__modal-title">
                {items[activeMetricIndex]?.title?.value}
              </h3>
              <div
                className="matrics-slider__modal-description"
                dangerouslySetInnerHTML={{ __html: items[activeMetricIndex]?.description?.value || '' }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MatricsSlider;
// ...existing code...