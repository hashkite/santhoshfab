import { HtmlField } from 'shared/ui';
import Picture from '../picture';

import './ourModelBlock.scss';

const OurModelBlockNew = ({ items }) => {
  return (
    <div className="our-model__block new">
      <div className="our-model__steps">
        {items.map(({ icon, title, description, id }) => (
          <div className="our-model__step" key={id}>
            {icon?.items?.[0]?.src && (
              <div className="step__icon">
                <Picture image={icon.items[0]} />
              </div>
            )}
            <div className="step__cnt">
              <div className="before" />
              <HtmlField text={title} className="step__title" />
              <HtmlField text={description} className="step__description" />
              <div className="after" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurModelBlockNew;
