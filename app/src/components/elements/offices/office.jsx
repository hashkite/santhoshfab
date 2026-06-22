import React from 'react';

import { Icon } from '../svg';
import { Button, Picture } from '../';

const Office = ({ data }) => {
  const { description, email, flag, phone, title, top_title } = data || {};

  return (
    <div className="offices__item">
      {top_title?.value && (
        <div className="office__subtitle">{top_title.value}</div>
      )}
      {(description?.value || title?.value || flag?.items?.[0]) && (
        <div className="office__header">
          {(title?.value || flag?.items?.[0]) && (
            <div className="office__title">
              {flag?.items?.[0]?.src && (
                <div className="flag">
                  <Picture image={flag.items[0]} />
                </div>
              )}
              {title?.value && <div className="title">{title.value}</div>}
            </div>
          )}
          {description?.value && (
            <div
              className="office__address"
              dangerouslySetInnerHTML={{ __html: description.value }}
            />
          )}
        </div>
      )}
      {(email?.value || phone?.value) && (
        <div className="office__contacts">
          {email?.value && (
            <Button
              data={{
                url: email.value,
                title: email.value,
                external: true,
              }}
              className="btn btn-link btn-black"
            >
              <div className="icon">
                <Icon icon="email" height="15px" width="15px" color="#5C00DB" />
              </div>
            </Button>
          )}
          {phone?.value && (
            <Button
              data={{
                url: phone.value,
                title: phone.value,
                external: true,
              }}
              className="btn btn-link btn-black"
            >
              <div className="icon">
                <Icon icon="phone" height="15px" width="15px" color="#5C00DB" />
              </div>
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Office;
