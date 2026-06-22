import { Picture } from 'components/elements';
import { Icon } from 'components/elements/svg';
import { HtmlField, LinkValidate, Mapper } from 'shared/ui';
import { Icons } from './icons';

export const CardItem = ({ description, image, link, title }) => {
  return (
    <div className="posts-carousel__slide">
      {image?.items?.[0]?.src && (
        <div className="posts-carousel__slide-pic">
          <Picture image={image.items[0]} />
        </div>
      )}
      <div className="posts-carousel__slide-content">
        <div className="posts-carousel__slide-tags">
          <HtmlField text={title} className="posts-carousel__slide-tag" />
        </div>
        <div className="posts-carousel__slide-title">
          <HtmlField text={description} className="decorated" Tag={'h3'} />
        </div>
        <Mapper
          className="posts-carousel__slide-links"
          array={link}
          children={item =>
            item.l_classes ? (
              <LinkValidate
                {...item}
                className={'btn btn-square btn-gray-border'}
              >
                {Icons[item.l_classes.split('fa-')[1]]}
              </LinkValidate>
            ) : (
              <LinkValidate {...item} className={'btn btn-primary'}>
                <Icon
                  icon="arrow--long--right"
                  color="white"
                  height="12px"
                  width="22px"
                />
                <span>{item.title}</span>
              </LinkValidate>
            )
          }
        />
      </div>
    </div>
  );
};
