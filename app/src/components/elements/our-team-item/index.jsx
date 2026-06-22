import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Picture } from '../../elements';
import { Icon } from '../../elements/svg';

import './ourTeamItem.scss';

const OurTeamItem = ({ data, discover }) => {
  const {
    link,
    icon,
    title: discoverTitle,
    subtitle: discoverSubtitle,
  } = discover || {};
  const { image, linkedin, role, title, url } = data || {};

  // if(discover && link){
  //   return (
  //     <Link
  //       to={link?.url}
  //       className="our-team__item --discover"
  //     >
  //       <div className="our-team-item__discover">
  //         {icon && (
  //           <div className="our-team-item__icon">
  //             <img src={icon?.src} alt={icon?.alt} />
  //           </div>
  //         )}
  //         {discoverTitle && (
  //           <div className="our-team-item__content">
  //             <h3>{discoverTitle}</h3>
  //             {discoverSubtitle && (
  //               <div className="our-team-item__subtitle">{discoverSubtitle}</div>
  //             )}
  //           </div>
  //         )}
  //         <div className="our-team-item__button">
  //           <Button
  //             className="btn btn-m btn-white-2"
  //             data={link}
  //             fake={true}
  //           >
  //             <div className="icon">
  //               <Icon
  //                 icon="arrow--long--right"
  //                 color="#8630FF"
  //                 height="11px"
  //                 widht="19px"
  //               />
  //             </div>
  //           </Button>
  //         </div>
  //       </div>
  //     </Link>
  //   )
  // } else {
  if (title) {
    return (
      <div className="our-team__item">
        <div to={url} className="our-team-item__top">
          {/* <Link to={url} className="our-team-item__top"> */}
          {image?.items?.[0]?.src && (
            <div className="our-team-item__image">
              <Picture image={image.items[0]} />
            </div>
          )}
          <div className="our-team-item__content">
            <h3>{title}</h3>
            {role?.items?.[0] && (
              <div className="our-team-item__subtitle">{role.items[0]}</div>
            )}
          </div>
          {/* </Link> */}
        </div>
      </div>
    );
  }
};

export default OurTeamItem;
