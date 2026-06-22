import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Icon } from '../svg';
import Submenu from './submenu';

const NavItem = ({ data, footer }) => {
  const { path, submenu, title } = data || {};
  const [isNavVisible, setIsNavVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsNavVisible(false);
    setTimeout(() => {
      setIsNavVisible(true);
    }, 10);
  }, [location]);

  if (!footer) {
    return (
      <div className="nav-block__nav-item">
        <Link to={path} className="nav-item__inner">
          {submenu && (
            <div className="icon">
              <Icon icon="triangle" color="#fff" height="6px" width="12px" />
            </div>
          )}
          <div className="text">{title}</div>
        </Link>
        {submenu && isNavVisible && (
          <div className="nav-block__submenu-wrapper">
            <Submenu items={submenu} />
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="nav-footer__row">
      <div className="nav-footer__row-title">
        <div className="title">{title}</div>
      </div>
      {submenu && <Submenu footer={footer} items={submenu} />}
    </div>
  );
};

export default NavItem;
