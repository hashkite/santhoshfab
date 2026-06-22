import { HtmlField, LinkValidate } from 'shared/ui';

export const NewUiItem = ({ title, description, image, link }, index) => {
  const linkAttributes = link?.items?.[0];
  const imageAttributes = image?.items?.[0];

  return (
    <LinkValidate
      {...linkAttributes}
      key={index}
      className="our-values__new_ui__item"
    >
      {imageAttributes && (
        <img
          alt=""
          className="our-values__new_ui__image"
          {...imageAttributes}
        />
      )}
      {(title || description) && (
        <div className="our-values__new_ui__content">
          <HtmlField text={title} Tag="h3" />
          <HtmlField text={description} Tag="p" />
        </div>
      )}
      {linkAttributes && (
        <LinkValidate {...linkAttributes} className="values-item__link purple">
          <span>{linkAttributes?.title}</span>
        </LinkValidate>
      )}
    </LinkValidate>
  );
};
