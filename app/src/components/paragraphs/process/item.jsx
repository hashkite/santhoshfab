import { HtmlField } from 'shared/ui';
import { inWords } from './utils';

export const Item = ({ multicolor_title, description, image, index }) => {
  const imageAttributes = image?.items?.[0] || {};
  return (
    <div className="process__item">
      {imageAttributes && (
        <img
          alt="process"
          {...imageAttributes}
          className="process__item-image"
        />
      )}
      <div className="process__item-content">
        <HtmlField text={multicolor_title} className="process__item-title" />
        <HtmlField text={description} className="process__item-description" />
      </div>
      {index !== 0 && (
        <div className="process__item-index">
          <span>Step {inWords(index)}</span>
        </div>
      )}
    </div>
  );
};
