import React from 'react';

import { Button, Picture } from '../';
import { Icon } from '../svg';

import './talentSidebar.scss';

const TalentSidebar = ({ data }) => {
  const {
    available_for_hire,
    description,
    experience,
    portfolio,
    work_experience,
    image,
    time_zone,
    title,
    verified_expert_in_enginee,
  } = data || {};

  return (
    <div className="talent__sidebar">
      {image?.items?.[0]?.src && title && (
        <div className="talent-sidebar__block --userpic">
          <div className="talent-sidebar__pic">
            <Picture image={image.items[0]} />
          </div>
          <div className="talent-sidebar__button">
            <Button className="btn btn-m btn-purple-gradient">
              <div className="text">Hire {title}</div>
            </Button>
          </div>
          <div className="talent-sidebar__info">
            <div className="talent-sidebar__availability">
              {title} is{' '}
              <span className="purple">
                {!available_for_hire?.value ? 'not ' : ''}available
              </span>{' '}
              for hire
            </div>
            {time_zone?.value && (
              <div className="talent-sidebar__timezone">{time_zone?.value}</div>
            )}
          </div>
          {/* {verified_expert_in_enginee?.value && (
            <div className="talent-sidebar__verified">
              <div className="icon">
                <Icon icon="check" color="#fff" height="9px" width="12px" />
              </div>
              <div className="text">{verified_expert_in_enginee?.label}</div>
            </div>
          )} */}
        </div>
      )}
      {(description?.value ||
        portfolio?.items ||
        experience?.items ||
        work_experience?.items) && (
        <div className="talent-sidebar__block --toc">
          <div className="talent-sidebar__header">
            <div className="talent-sidebar__header-title">
              Machine vision technologies
            </div>
          </div>
          <div className="talent-sidebar__toc-list">
            {description?.value && (
              <div className="talent-sidebar__toc-item">
                <a href="#talent-description">Description</a>
              </div>
            )}
            {portfolio?.items && (
              <div className="talent-sidebar__toc-item">
                <a href="#talent-portfolio">Portfolio</a>
              </div>
            )}
            {experience?.items && (
              <div className="talent-sidebar__toc-item">
                <a href="#talent-experience">Experience</a>
              </div>
            )}
            {work_experience?.items && (
              <div className="talent-sidebar__toc-item">
                <a href="#talent-work-experience">Work Experience</a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TalentSidebar;
