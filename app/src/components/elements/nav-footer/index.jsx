import React from 'react';
import NavItem from '../nav-block/nav-item';
import './navFooter.scss';

const NavFooter = ({ items }) => {
  return (
    <div className="nav-footer__block">
      <nav>
        {items?.map((item, index) => (
          <NavItem footer={true} key={index} data={item} />
        ))}
      </nav>
    </div>
  );
};

export default NavFooter;
