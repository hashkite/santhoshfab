import React from 'react';

import { Button } from '../';
import { Icon } from '../svg';

import './navSocial.scss';

const NavSocial = ({ items, type }) => {
  const btnClassNames = type === 'footer' ? 'btn-social--simple' : 'btn-social';

  return (
    <div className={`nav-social__block${type ? ' --type-'+type : ''}`}>
      <nav>
        {items.map((link, index) => (
          <Button
            className={`btn ${btnClassNames}`}
            data={link}
            key={index}
          >
            {link?.l_classes === 'instagram' && (
              <div className="icon">
                <Icon 
                  icon="insta-2"
                  height="20px"
                  width="20px"
                  color="white"
                />
              </div>
            )}
            {link?.l_classes === 'facebook' && (
              <div className="icon">
                <Icon 
                  icon="fb-2"
                  height="20px"
                  width="20px"
                  color="white"
                />
              </div>
            )}
            {link?.l_classes === 'linkedin' && (
              <div className="icon">
                <Icon 
                  icon="ln"
                  height="20px"
                  width="20px"
                  color="white"
                />
              </div>
            )}
          </Button>
        ))}
      </nav>
    </div>
  )
}

export default NavSocial