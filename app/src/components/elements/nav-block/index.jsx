import React from 'react';

import Nav from './nav';

const NavBlock = ({ items }) => {
  return (
    <>
      {items && (
        <div className="nav-block__nav-wrapper">
          <Nav items={items} />
        </div>
      )}
    </>
  )
}

export default NavBlock