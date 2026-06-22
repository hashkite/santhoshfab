import { Button } from 'components/elements';
import { Icon } from 'components/elements/svg';
import { HtmlField, Mapper } from 'shared/ui';

export const Item = ({
  multicolor_title,
  description,
  icon,
  image,
  index,
  background_image,
  link,
}) => {
  const imageAttributes = image?.items?.[0];
  const backgroundImage = background_image?.items?.[0];
  const iconAttributes = icon?.items?.[0];
  const linkAttributes = link?.items?.[0];

  return (
    <div className={`puzzles__item puzzles__item-${index}`}>
      <div className="puzzles__item__media">
        {imageAttributes && (
          <img alt={'alt'} className="puzzles__image" {...imageAttributes} />
        )}
        {backgroundImage && (
          <img
            alt={'alt'}
            className="puzzles__background_image"
            {...backgroundImage}
          />
        )}
      </div>
      <div className="puzzles__item__content">
        {iconAttributes && (
          <img alt={'alt'} className="puzzles__icon" {...iconAttributes} />
        )}
        <HtmlField text={multicolor_title} className="puzzles__item__title" />
        <HtmlField text={description} className="puzzles__item__description" />
        <Mapper array={link}>
          {(data, index) => (
            <Button key={index} data={data} className="btn btn-link">
              <div className="icon">
                <Icon
                  icon="arrow--long--right"
                  color="#5c00db"
                  height="11px"
                  width="22px"
                />
              </div>
            </Button>
          )}
        </Mapper>
      </div>
    </div>
  );
};
