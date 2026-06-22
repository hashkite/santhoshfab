import { darkenColor } from 'shared/utils';

export const MarketingCardItem = ({
  background_color,
  card_type,
  cta,
  description,
  image,
  title,
}) => {
  const bgColor = background_color?.value
    ? background_color.value.startsWith('#')
      ? background_color.value
      : `#${background_color.value}`
    : '#fff';
  const headerBg = background_color?.value ? darkenColor(bgColor, 0.1) : '#eee';
  const cardTypeValue = card_type?.value || 'default';

  console.log(cardTypeValue,'cardTypeValue in marketing card item');
  if (cardTypeValue === 'colored') {
    return (
      <div
        className={`marketing-card marketing-card--${cardTypeValue}`}
        aria-label="marketing_card"
      >
        <div
          className="marketing-card__header"
          style={{ backgroundColor: headerBg }}
        >
          {image?.items?.[0] && (
            <div className="marketing-card__image">
              <img src={image.items[0].src} alt={image.items[0].alt || ''} />
            </div>
          )}
          {title?.value && (
            <h2 className="marketing-card__title">
              {cta?.url ? (
                <a href={cta.url} target={cta.external ? '_blank' : undefined} rel={cta.external ? 'noopener noreferrer' : undefined}>
                  {title.value}
                </a>
              ) : (
                title.value
              )}
            </h2>
          )}
        </div>
        <div className="marketing-card__content">
          {description?.value && (
            <div
              className="marketing-card__description"
              dangerouslySetInnerHTML={{ __html: description.value }}
            />
          )}
        </div>
      </div>
    );
  }

  if (cardTypeValue === 'small_colored') {
    return (
      <div
        className={`marketing-card marketing-card--${cardTypeValue}`}
        style={{ backgroundColor: bgColor }}
        aria-label="marketing_card"
      >
        <div className="marketing-card__header">
          {image?.items?.[0] && (
            <div className="marketing-card__image">
              <img src={image.items[0].src} alt={image.items[0].alt || ''} />
            </div>
          )}
        <div className="marketing-card__content">
          {title?.value && (
            <h2 className="marketing-card__title">{title.value}</h2>
          )}
          {description?.value && (
            <div
              className="marketing-card__description"
              dangerouslySetInnerHTML={{ __html: description.value }}
            />
          )}
        </div>
        </div>
      </div>
    );
  }

  if (cardTypeValue === 'large' || cardTypeValue === 'large_colored') {
    return (
      <div
        className={`marketing-card marketing-card--${cardTypeValue}`}
        style={{ backgroundColor: bgColor }}
        aria-label="marketing_card"
      >
        <div className="marketing-card__header">
          {image?.items?.[0] && (
            <div className="marketing-card__image">
              <img src={image.items[0].src} alt={image.items[0].alt || ''} />
            </div>
          )}
          {title?.value && (
            <h2 className="marketing-card__title">
              {console.log(cta,'cta')}
              {cta ? (
                cta?.items.map((item, idx) => (
                  <a key={idx} href={item.url} target={item.external ? '_blank' : undefined} rel={item.external ? 'noopener noreferrer' : undefined}>
                    {title.value}
                  </a>
                ))
                
              ) : (
                title.value
              )}
            </h2>
          )}
        </div>
        <div className="marketing-card__content">
          {description?.value && (
            <div
              className="marketing-card__description"
              dangerouslySetInnerHTML={{ __html: description.value }}
            />
          )}
        </div>
      </div>
    );
  }

 // tcwb and tc: no background, title colored
  if (cardTypeValue === 'tcwb' || cardTypeValue === 'tc') {
    return (
      <div className={`marketing-card marketing-card--${cardTypeValue}`} aria-label="marketing_card">
        <div className="marketing-card__content">
          {title?.value && (
            <h2
              className="marketing-card__title"
            >
              {title.value}
            </h2>
          )}
          {description?.value && (
            <div
              className="marketing-card__description"
              dangerouslySetInnerHTML={{ __html: description.value }}
            />
          )}
        </div>
      </div>
    );
  }


  // Default fallback
  return (
    <div
      className="marketing-card marketing-card--default"
      aria-label="marketing_card"
    >
      {image?.items?.[0] && (
        <div className="marketing-card__image">
          <img src={image.items[0].src} alt={image.items[0].alt || ''} />
        </div>
      )}
      <div className="marketing-card__content">
        {title?.value && (
          <h2 className="marketing-card__title">{title.value}</h2>
        )}
        {description?.value && (
          <div
            className="marketing-card__description"
            dangerouslySetInnerHTML={{ __html: description.value }}
          />
        )}
      </div>
    </div>
  );
};
