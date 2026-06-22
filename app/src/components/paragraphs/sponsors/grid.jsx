import { Picture } from 'components/elements';
import { useRef } from 'react';

export const GridSponsors = ({ items }) => {
  const container = useRef(null);

  return (
    <div className="sponsors-grid" ref={container}>
      <div className="container">
        <div className="sponsors-grid__items">
          {items?.map((item, index) => (
            <div key={index} className="sponsors-grid__item">
              <Picture image={item} />
            </div>
          ))}
          <span className="border-item left-top" />
          <span className="border-item left-bottom" />
          <span className="border-item right-top" />
          <span className="border-item right-bottom" />
        </div>
      </div>
    </div>
  );
};
