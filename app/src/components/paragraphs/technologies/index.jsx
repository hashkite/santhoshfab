import React from 'react';
import { Picture } from '../../elements';
import './technologies.scss';

const Technologies = ({ data }) => {
  const title = data?.title?.value || data?.title || 'Technologies';
  const groups = data?.technology_groups?.items || [];

  const getLink = imgObj => {
    if (!imgObj) return '#';
    return (
      imgObj?.link?.items?.[0]?.uri ||
      imgObj?.link?.uri ||
      imgObj?.link?.url ||
      '#'
    );
  };

  const collectImageItems = group => {
    // Normalize different possible nesting shapes into an array of image item objects
    const out = [];
    // shape 1: group.technology_items.items[] -> each item has technology_image_items.items[]
    const techItems = group?.technology_items?.items || group?.items || [];
    techItems.forEach(t => {
      const imgs =
        t?.technology_image_items?.items ||
        t?.image_items?.items ||
        t?.image?.items ||
        t?.technology_image_items ||
        [];
      if (Array.isArray(imgs)) out.push(...imgs);
    });
    // fallback: group may directly expose technology_image_items
    if (out.length === 0) {
      const direct =
        group?.technology_image_items?.items ||
        group?.technology_image_items ||
        [];
      if (Array.isArray(direct)) out.push(...direct);
    }
    return out;
  };

  return (
    <section className="technologies">
      <div className="technologies__container">
        <div className="technologies__header">
          {/* <span className="technologies__marker" aria-hidden="true" /> */}
          <h2 className="technologies__title">{title}</h2>
        </div>

        <p className="technologies__subtitle">
          Click on the technology you're interested in to learn about our
          relevant capabilities.
        </p>

        <div className="technologies__panel">
          {groups.map((group, gIndex) => {
            const groupTitle = group?.title?.value || group?.title || '';
            const techItems =
              group?.technology_items?.items || group?.items || [];
            // fallback direct images if group exposes them
            const directImages = group?.technology_image_items?.items || [];

            return (
              <div className="tech-group" key={group.id || gIndex}>
                {groupTitle ? (
                  <h3 className="tech-group__title">{groupTitle}</h3>
                ) : null}

                {/* If there are nested technology_items, render each with its optional title */}
                <div className="tech-item-group-wrapper">
                  {techItems.length > 0 ? (
                    techItems.map((tItem, ti) => {
                      const itemTitle =
                        tItem?.title?.value || tItem?.title || '';
                      const imgs =
                        tItem?.technology_image_items?.items ||
                        tItem?.image?.items ||
                        tItem?.technology_image_items ||
                        [];
                      return (
                        <div className="tech-item-group" key={tItem.id || ti}>
                          {itemTitle ? (
                            <div className="tech-subtitle">{itemTitle}</div>
                          ) : null}
                          <div className="tech-group__items">
                            {Array.isArray(imgs) &&
                              imgs.map((imgItem, i) => {
                                const href = getLink(imgItem) || '#';
                                const imageAttr =
                                  imgItem?.image?.items?.[0] ||
                                  imgItem?.image ||
                                  imgItem ||
                                  {};
                                const alt =
                                  imageAttr?.alt || imgItem?.title?.value || '';
                                return (
                                  <a
                                    key={imgItem?.id || i}
                                    className="tech-item"
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={alt || itemTitle || groupTitle}
                                  >
                                    <div className="tech-item__box">
                                      {imageAttr?.src ? (
                                        <Picture image={imageAttr} />
                                      ) : (
                                        <div className="tech-item__placeholder">
                                          {alt || 'logo'}
                                        </div>
                                      )}
                                    </div>
                                  </a>
                                );
                              })}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    /* fallback: render direct images under the group */
                    <div className="tech-group__items">
                      {Array.isArray(directImages) &&
                        directImages.map((imgItem, i) => {
                          const href = getLink(imgItem) || '#';
                          const imageAttr =
                            imgItem?.image?.items?.[0] ||
                            imgItem?.image ||
                            imgItem ||
                            {};
                          const alt =
                            imageAttr?.alt || imgItem?.title?.value || '';
                          return (
                            <a
                              key={imgItem?.id || i}
                              className="tech-item"
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={alt || groupTitle}
                            >
                              <div className="tech-item__box">
                                {imageAttr?.src ? (
                                  <Picture image={imageAttr} />
                                ) : (
                                  <div className="tech-item__placeholder">
                                    {alt || 'logo'}
                                  </div>
                                )}
                              </div>
                            </a>
                          );
                        })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Technologies;
