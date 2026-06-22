import classNames from 'classnames';
import { Icon } from 'components/elements/svg';
import { useEffect } from 'react';
import { HtmlField, LinkValidate, Mapper } from 'shared/ui';

export const ValuesItem = ({ title, description, image, link }) => {
  const linkAttributes = link?.items?.[0];

  return (
    <LinkValidate
      {...linkAttributes}
      className={classNames('values-item', linkAttributes && 'card')}
    >
      <Mapper array={image}>
        {attributes => (
          <img alt="" {...attributes} className="values-item__image" />
        )}
      </Mapper>
      <div className="values-item__content">
        <HtmlField text={title} Tag="h3" className="values-item__title" />
        <HtmlField
          text={description}
          Tag="p"
          className="values-item__description"
        />
        {linkAttributes && (
          <LinkValidate
            {...linkAttributes}
            className="values-item__link purple"
          >
            <span>{linkAttributes?.title}</span>
            <Icon
              icon="arrow--long--right"
              color="#5C00DB"
              height="15px"
              width="30px"
            />
          </LinkValidate>
        )}
      </div>
    </LinkValidate>
  );
};
