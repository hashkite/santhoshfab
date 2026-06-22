import { useEffect } from 'react';
import { HtmlField, LinkValidate, Mapper } from 'shared/ui';

export const ContactWaysItem = ({ description, link, title, image }) => {
  const linkAttributes = link?.items?.[0];
  useEffect(() => {
    if (linkAttributes?.l_classes === 'open-chat') {
      document.querySelector('a.open-chat').addEventListener('click', e => {
        e.preventDefault();
        window?.HubSpotConversations?.widget.open();
      });
    }
  }, [linkAttributes]);
  return (
    <LinkValidate
      {...linkAttributes}
      className="contact-ways__item btn btn-gray-border"
    >
      <Mapper array={image}>
        {props => <img alt="" className="contact-ways__item-icon" {...props} />}
      </Mapper>
      <div className="contact-ways__item-content">
        <HtmlField text={title} Tag="h3" className="contact-ways__item-title" />
        <HtmlField
          text={description}
          className="contact-ways__item-description"
        />
        {linkAttributes.title && linkAttributes.l_classes !== 'open-chat' && (
          <LinkValidate
            {...linkAttributes}
            className={'contact-ways__item-link'}
          />
        )}
      </div>
    </LinkValidate>
  );
};
