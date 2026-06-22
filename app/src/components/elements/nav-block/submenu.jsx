import React from 'react';

import SubmenuCol from './submenu-col';

const Submenu = ({ items, footer }) => {
  if (!footer) {
    return (
      <div className="nav-block__submenu">
        <div className="container">
          <div className="nav-block__submenu-cols">
            {items?.map(item => (
              <SubmenuCol key={item?.id} data={item} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="nav-footer__submenu">
      {items?.map(item => (
        <SubmenuCol footer={footer} key={item?.id} data={item} />
      ))}
    </div>
  );
};

export default Submenu;
