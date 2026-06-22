import React from 'react';
import './services.scss';
import Service from './service';
import { Picture } from '../../elements';

const Services = ({ data }) => {
  const { multicolor_title, description, paragraphs, paragraph } = data;
  const { link, icon } = paragraph?.items?.[0] || {};
  const { hash } = window.location;

  const scrollToSection = (id, cls, last) => {
    const section = id
      ? document.getElementById(id.replace('#', ''))
      : cls
      ? document.querySelector(`.${hash.replace('#', '')}`)
      : null;

    if (section) {
      window.scrollTo({
        top: section.offsetTop - (last ? 100 : 140),
        behavior: 'smooth',
      });
    }
  };

  const handleKeyDown = (event, internal_id) => {
    if (event.key === 'Enter' || event.key === ' ') {
      scrollToSection(internal_id);
    }
  };

  if (hash) scrollToSection(null, hash);

  return (
    <div className="services">
      <div className="container">
        {paragraphs?.items?.length > 0 && (
          <div className="text-center">
            <ul className="services__nav">
              {paragraphs?.items?.map(p => {
                const { id, title, image } = p?.service?.items?.[0] || {};
                const { svg } = image?.items?.[0] || {};
                const section_id = 'section-' + p.internal_id;

                return (
                  <li key={id}>
                    <div
                      role="button"
                      tabIndex="0"
                      onClick={() => scrollToSection(section_id)}
                      onKeyDown={e => handleKeyDown(e, section_id)}
                    >
                      <div dangerouslySetInnerHTML={{ __html: svg }} />
                      {title && <span>{title}</span>}
                    </div>
                  </li>
                );
              })}
              {link?.items?.[0]?.url && (
                <li>
                  <div
                    role="button"
                    tabIndex="0"
                    className="last"
                    onClick={() => scrollToSection(link.items[0].url, null, true)}
                    onKeyDown={e => handleKeyDown(e, link.items[0].url)}
                  >
                    {icon?.items?.[0]?.src && <Picture image={icon.items[0]} />}
                    {link?.items?.[0]?.title && (
                      <span>{link.items[0].title}</span>
                    )}
                  </div>
                </li>
              )}
            </ul>
          </div>
        )}
        <div className="services__header">
          {multicolor_title?.value && (
            <div
              className="text-center"
              dangerouslySetInnerHTML={{ __html: multicolor_title.value }}
            />
          )}
          {description?.value && (
            <div
              className="description text-center"
              dangerouslySetInnerHTML={{ __html: description.value }}
            />
          )}
        </div>
        {paragraphs?.items?.length > 0 && (
          <div className="services__row">
            <Service data={paragraphs} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
