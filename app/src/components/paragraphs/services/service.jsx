import React from 'react';
import { Button, Picture } from '../../elements';
import './services.scss';

const Service = ({ data }) => {
  const { items } = data;

  return (
    <>
      {items?.map(p => {
        const { id, description, image, paragraphs, service } = p;
        const {
          description: subtitle,
          title,
          image: icon,
          related_nodes,
        } = service?.items?.[0] || {};
        const { svg } = icon?.items?.[0] || {};

        return (
          <div
            className={`service ${title.toLowerCase().replace(' ', '-')}`}
            key={id}
            id={`section-${p.internal_id}`}
          >
            <div className="row">
              <div className="col-sm-4 service__left-col">
                {image?.items?.[0]?.src && <Picture image={image.items[0]} />}
              </div>
              <div className="col-sm-8 col-xl-7 offset-xl-1 service__right-col">
                <div className="service__header">
                  {svg && (
                    <div
                      className="service__header-icon"
                      dangerouslySetInnerHTML={{ __html: svg }}
                    />
                  )}
                  <div className="service__header-text">
                    {title && <h3>{title}</h3>}
                    {subtitle?.value && (
                      <div
                        dangerouslySetInnerHTML={{ __html: subtitle.value }}
                      />
                    )}
                  </div>
                </div>
                {related_nodes && Object.keys(related_nodes).length > 0 && (
                  <ul className="service__links">
                    {Object.keys(related_nodes).map((key, i) => {
                      const { title, url, icon } = related_nodes[key];

                      return (
                        <li key={i}>
                          <Button data={{ url, title }}>
                            {icon?.items?.[0]?.src && (
                              <span className="img">
                                <Picture image={icon.items[0]} />
                              </span>
                            )}
                            <span className="caret" />
                          </Button>
                        </li>
                      );
                    })}

                    {paragraphs?.items.map((item, i) => {
                      const { svg } = item?.icon?.items?.[0] || {};

                      return (
                        <li key={i}>
                          <Button data={item.link.items[0]}>
                            <span
                              className="svg"
                              dangerouslySetInnerHTML={{ __html: svg }}
                            />
                            <span className="caret" />
                          </Button>
                        </li>
                      );
                    })}
                  </ul>
                )}
                {description?.value && (
                  <div
                    className="service__description"
                    dangerouslySetInnerHTML={{ __html: description.value }}
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Service;
