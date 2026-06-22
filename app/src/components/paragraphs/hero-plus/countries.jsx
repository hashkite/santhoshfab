import { useEffect, useState } from 'react';

const getRandomElement = arr => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const Countries = ({ icon, title, index, position, isActive }) => {
  const [curPosition, setPosition] = useState(
    position?.items ? getRandomElement(position.items) : null
  );
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    if (!position?.items) return;
    if (!isActive) {
      const timeout = setTimeoutId(
        setTimeout(() => setPosition(getRandomElement(position.items)), 600)
      );
      setTimeoutId(timeout);
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }
    }
  }, [isActive]);

  return (
    <div className={`footprints-carousel__item`}>
      <div className="footprints-carousel__header">
        {icon?.items?.[0]?.src && (
          <div className="footprints-carousel__flag">
            <img src={icon?.items?.[0]?.src} alt={icon?.items?.[0]?.alt} />
          </div>
        )}
        {title && <div className="footprints-carousel__country">{title}</div>}
      </div>

      <div className="footprints-carousel__content">
        <div className="footprints-carousel__address">
          {curPosition && <span>{curPosition}</span>}
        </div>
      </div>
    </div>
  );
};
