import React from 'react';
import './clientTestimonial.scss';

const ClientTestimonial = ({ data }) => {
  const items = data?.client_testimonial_items?.items || [];
  const title = data?.title?.value || '';

  const getImage = (obj) => obj?.items?.[0]?.src || '';
  const getText = (obj) => obj?.value || '';

  return (
    <section className="client-testimonials container">
      {title && <h2 className="client-testimonials__title">{title}</h2>}
      {items.map((it, idx) => {
        const logo = getImage(it?.logo);
        const avatar = getImage(it?.avatar || it?.image);
        const name = getText(it?.title) || '';
        const subtitle = getText(it?.subtitle) || '';
        const description = getText(it?.description) || '';
        const originalLink = (it?.links && it.links[0]) || '/';

        return (
          <article className="testimonial-card" key={it.id || idx}>
            <div className="testimonial-card__inner">
              <div className="testimonial-card__logo">
                {logo ? <img src={logo} alt="client logo" /> : null}
              </div>

              <div className="testimonial-card__body">
                <div className="testimonial-card__top">
                  <div className="testimonial-card__person">
                    {avatar ? <img className="testimonial-card__avatar" src={avatar} alt={name} /> : <div className="testimonial-card__avatar--placeholder" />}
                    <div className="testimonial-card__person-meta">
                      <div className="testimonial-card__name">{name} <span className="testimonial-card__linkedin" aria-hidden>in</span></div>
                      <div className="testimonial-card__role">{subtitle}</div>
                    </div>
                  </div>

                  <div className="testimonial-card__rating" aria-hidden>
                    <span>★ ★ ★ ★ ★</span>
                  </div>
                </div>

                <div className="testimonial-card__text" dangerouslySetInnerHTML={{ __html: description }} />

                <div className="testimonial-card__links">
                  <a className="testimonial-card__link" href={originalLink || '/contact'}>Check the original</a>
                  {/* optional project link placeholder */}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default ClientTestimonial;
