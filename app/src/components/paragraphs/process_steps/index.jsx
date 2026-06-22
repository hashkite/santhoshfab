import React from 'react';
import './processSteps.scss';

const ProcessSteps = ({ data }) => {
  const title = data?.title?.value || '';
  const items = data?.process_steps_items?.items || [];

  return (
    <section className="process-steps container">
      {title && <h2 className="process-steps__title">{title}</h2>}

      <div className="process-steps__list">
        {items.map((it, idx) => (
          <div className="process-steps__item" key={it.id || idx}>
            <div className="process-steps__marker">
              <div className="process-steps__number">{idx + 1}</div>
            </div>

            <div className="process-steps__content">
              <h3 className="process-steps__heading">{it?.title?.value}</h3>

              {it?.meta_title?.value && (
                <div className="process-steps__meta">
                  <span className="process-steps__meta-title">{it.meta_title.value}</span>
                  <span className="process-steps__meta-value" dangerouslySetInnerHTML={{ __html: it?.meta_values?.value || '' }} />
                </div>
              )}

              {it?.description?.value && (
                <div className="process-steps__desc" dangerouslySetInnerHTML={{ __html: it.description.value }} />
              )}

              {it?.tip?.value && (
                <div className="process-steps__tip"><strong>Tip:</strong> <span dangerouslySetInnerHTML={{ __html: it.tip.value }} /></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProcessSteps;
