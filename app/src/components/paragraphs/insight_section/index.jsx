import React from 'react';
import './insightSection.scss';

const InsightSection = ({ data }) => {
  const quote = data?.quote?.value || '';
  const description = data?.description?.value || '';
  const image = data?.image?.items?.[0]?.src || '';
  const name = data?.insighter_name?.items?.[0]?.value || '';
  const title = data?.title?.value || '';

  return (
    <section className="insight container">
      <div className="insight__card">
        <div className="insight__inner">
          <div className="insight__left">
            <div className="insight__photo">
              {image ? <img src={image} alt={name || 'insighter'} /> : null}
            </div>
            <div className="insight__name">{name}</div>
            <div className="insight__role">{title}</div>
          </div>

          <div className="insight__right">
            <h3 className="insight__quote">{quote}</h3>
            <div className="insight__desc" dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </div>
      </div>

      <div className="insight__cta">
        <div className="insight__cta-inner">
          <div className="insight__cta-left">
            <h4>Ready to discuss your project?</h4>
            <p>We can start with your specific needs analysis, cost breakdown, project and risk management planning. To test the ideas and start getting ROI earlier, we can first launch an MVP (usually, it takes only 2-4 months!).</p>
          </div>
          <div className="insight__cta-right">
            <a className="insight__cta-btn" href="/contact">Request web app development</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightSection;
