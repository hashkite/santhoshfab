import React from 'react';

import NavItem from './nav-item';

import './nav.scss';

const Nav = ({ items }) => {
  return (
    <nav className="nav-block__nav">
      {items && items.map((item, index) => (
        <NavItem key={index} data={item} />
      ))}
    </nav>
  )
}

export default Nav