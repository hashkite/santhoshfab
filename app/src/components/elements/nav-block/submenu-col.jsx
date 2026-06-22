import React from 'react';

import { Button, Picture } from '../';

const SubmenuCol = ({ data, footer }) => {
  const { icon, submenu, service, subtitle, title } = data || {};
  const { description } = service?.items?.[0] || data || {};
  const { image, related_nodes } = service?.items?.[0] || {};

  if (!footer) {
    return (
      <div className="nav-block__submenu-col">
        {title && (
          <div className="submenu-col__header">
            {(icon?.items?.[0]?.src && (
              <div className="submenu-col__header-icon">
                <Picture image={icon.items[0]} />
              </div>
            )) ||
              (image?.items?.[0]?.src && (
                <div className="submenu-col__header-icon">
                  <Picture image={image.items[0]} />
                </div>
              ))}
            <div className="submenu-col__header-cnt">
              <div className="submenu-col__title">{title}</div>
              {(subtitle?.value && (
                <div className="submenu-col__subtitle">{subtitle.value}</div>
              )) ||
                (description?.value && (
                  <div
                    className="submenu-col__subtitle"
                    dangerouslySetInnerHTML={{
                      __html: description.value,
                    }}
                  />
                ))}
            </div>
          </div>
        )}
        {submenu && (
          <div className="submenu-col__links">
            {submenu.map(item => (
              <Button
                data={item}
                className="submenu-col__link"
                key={item?.id}
              />
            ))}
          </div>
        )}
        {related_nodes && Object.keys(related_nodes).length > 0 && (
          <div className="submenu-col__links">
            {Object.keys(related_nodes).map(key => {
              const { title, url, id } = related_nodes[key];

              return (
                <Button
                  className="submenu-col__link"
                  key={id}
                  data={{ url, title }}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="nav-footer__col">
      {title && (
        <div className="nav-footer__col-header">
          {(icon?.items?.[0]?.src && (
            <div className="img">
              <Picture image={icon.items[0]} />
            </div>
          )) ||
            (image?.items?.[0]?.src && (
              <div className="img">
                <Picture image={image.items[0]} />
              </div>
            ))}
          <div className="title">{title}</div>
        </div>
      )}
      {submenu && (
        <ul className="nav-footer__col-menu">
          {submenu.map(item => (
            <li className="item" key={item?.id}>
              <Button data={item} className="link" />
            </li>
          ))}
        </ul>
      )}
      {related_nodes && Object.keys(related_nodes).length > 0 && (
        <ul className="nav-footer__col-menu">
          {Object.keys(related_nodes).map(key => {
            const { title, url, id } = related_nodes[key];

            return (
              <li key={id} className="item">
                <Button className="link" data={{ url, title }} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SubmenuCol;
