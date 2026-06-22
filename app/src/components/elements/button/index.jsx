import React from 'react';
import { Link } from 'react-router-dom';
import './button.scss';

const Button = ({ data, className, fake, children, ...other }) => {
  const { url, path, target, title, external, submenu } = data || {};
  const l_classes = data?.l_classes ? ' ' + data?.l_classes : '';

  if ((url || path || submenu) && !fake) {
    return (
      <>
        {(external && (
          <a
            className={className ? className + l_classes : l_classes}
            href={url || path}
            rel="noreferrer"
            target={target ? target : '_blank'}
            {...other}
          >
            {children}
            <div className="text">{title ? title : url || path}</div>
          </a>
        )) || (
          <Link
            to={url || path}
            className={className ? className + l_classes : l_classes}
            target={target ? target : null}
            {...other}
          >
            {children}
            <div className="text">{title ? title : url || path}</div>
          </Link>
        )}
      </>
    );
  } else {
    return (
      <button className={className} {...other}>
        {children}
        {title && <div className="text">{title}</div>}
      </button>
    );
  }
};

export default Button;
