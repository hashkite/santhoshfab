import React, { useRef } from 'react';
import classNames from 'classnames';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './style.scss';
import { Button } from 'components/elements';
import { MediaRenderer } from 'components/elements/media-renderer/MediaRenderer';

gsap.registerPlugin(ScrollTrigger);

const TextWithContent = ({ data }) => {
  const container = useRef(null);
  const {
    align_text_left,
    text,
    cta,
    sub_description,
    background_color,
    media,
    section_id,
  } = data || {};
  // align_text_left: boolean, true = text left/media right, false = media left/text right
  const isTextLeft = !!align_text_left;
  const mediaItem = media?.items?.[0];

  // GSAP Animation on scroll
  useGSAP(
    () => {
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
    },
    { dependencies: [data], scope: container }
  );

  // Layout: with background color (featured) vs without (regular)
  if (data.content_type?.value === 'background') {
    return (
      <section
        id={section_id?.value}
        className="text-with-content text-with-content--featured"
        ref={container}
        aria-label={data?.type || 'text_with_content'}
      >
        <div className="container">
          <div
            style={{ backgroundColor: `#${background_color.value}` }}
            className={classNames(
              'text-with-content__row text-with-content__row--featured',
              {
                'text-with-content__reverse': !isTextLeft,
              }
            )}
          >
            <div className="text-with-content__media">
              {mediaItem && (
                <MediaRenderer media={mediaItem} className="featured-media" />
              )}
            </div>
            <div className="text-with-content__text-block">
              <div className="text-with-content__text">
                {text?.value && (
                  <div dangerouslySetInnerHTML={{ __html: text.value }} />
                )}
              </div>
              {cta?.items?.length > 0 && (
                <div className="text-with-content__ctas">
                  {cta.items.map((item, idx) => (
                    <Button
                      key={idx}
                      data={{
                        title: item.title,
                        url: item.url,
                        external: item.external,
                        target: item.external ? '_blank' : null,
                      }}
                      className="btn btn-primary"
                      fake={false}
                      children={null}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Regular layout without background color
  return (
    <section
      id={section_id?.value}
      className="text-with-content"
      ref={container}
      aria-label={data?.type || 'text_with_content'}
    >
      <div className="container">
        <div
          className={classNames('text-with-content__row', {
            'text-with-content__reverse': !isTextLeft,
          })}
        >
          <div className="text-with-content__text">
            {text?.value && (
              <div dangerouslySetInnerHTML={{ __html: text.value }} />
            )}
          </div>
          <div className="text-with-content__media">
            {mediaItem && <MediaRenderer media={mediaItem} />}
          </div>
        </div>
        {sub_description?.value && (
          <div
            className="text-with-content__sub-description"
            dangerouslySetInnerHTML={{ __html: sub_description.value }}
          />
        )}
        {cta?.items?.length > 0 && (
          <div className="text-with-content__ctas">
            {cta.items.map((item, idx) => (
              <Button
                key={idx}
                data={{
                  title: item.title,
                  url: item.url,
                  external: item.external,
                  target: item.external ? '_blank' : null,
                }}
                className="btn btn-secondary"
                fake={false}
                children={null}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TextWithContent;
