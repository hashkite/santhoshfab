import { Picture } from 'components/elements';

export const HorizontalScrollItem = ({
  multicolor_title,
  description,
  image,
}) => {
  return (
    <div className="horizontal-scroll__item">
      <div className="horizontal-scroll__item-content">
        <div className="horizontal-scroll__item-content-title">
          <div dangerouslySetInnerHTML={{ __html: multicolor_title.value }} />
        </div>
        <div className="horizontal-scroll__item-content-description">
          <div dangerouslySetInnerHTML={{ __html: description.value }} />
        </div>
      </div>
      <div className="horizontal-scroll__item-image">
        <Picture image={image?.items[0]} />
      </div>
    </div>
  );
};
