import React from 'react';
import { Link } from 'react-router-dom';

import './breadcrumbs.scss';

const Breadcrumbs = ({ items }) => {
  return (
    <div className="breadcrumbs__block">
      <div className="container">
        <div className="breadcrumbs__list">
          {items && items.map((item, index) => (
            <React.Fragment key={index}>
              {item?.link && (
                <>
                  <Link 
                    to={item.link}
                    className="breadcrumbs__item"
                  >
                    {item?.text}
                  </Link>
                  <i className="breadcrumbs__separator" />
                </>
              )}
              {!item?.link && (
                <div className="breadcrumbs__item">{item?.text}</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Breadcrumbs