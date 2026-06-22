import React from 'react';
import './achievementsWrapper.scss';

const AchievementsWrapper = ({ data }) => {
  const title = data?.title?.value || '';
  const items = data?.achievements_items?.items || [];

  const getImage = item => item?.image?.items?.[0]?.src || '';
  const getAlt = item =>
    item?.image?.items?.[0]?.alt || item?.image?.items?.[0]?.name || '';
  const getCta = item => item?.cta?.items?.[0]?.url || '#';

  return (
    <section className="achievements container">
      {title && <h2 className="achievements__title">{title}</h2>}

      <div className="achievements__grid">
        <div className="achievements__big-row">
          {items.slice(0, 2).map((it, idx) => (
            <a
              key={it.id || idx}
              href={getCta(it)}
              className="achievements__card achievements__card--big"
              target={getCta(it).startsWith('http') ? '_blank' : '_self'}
              rel="noopener noreferrer"
            >
              <div className="achievements__card-media">
                <img src={getImage(it)} alt={getAlt(it)} />
              </div>
              <div className="achievements__card-body">
                <div className="achievements__card-text">
                  {it?.cta?.items?.[0]?.title || ''}
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="achievements__small-row">
          {items.slice(2).map((it, idx) => (
            <a
              key={it.id || idx}
              href={getCta(it)}
              className="achievements__card achievements__card--small"
              target={getCta(it).startsWith('http') ? '_blank' : '_self'}
              rel="noopener noreferrer"
            >
              <div className="achievements__card-media">
                <img src={getImage(it)} alt={getAlt(it)} />
              </div>
              <div className="achievements__card-body">
                <div className="achievements__card-text">
                  {it?.cta?.items?.[0]?.title || ''}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsWrapper;
