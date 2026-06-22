import React from 'react';

import { Breadcrumbs, TalentContent, TalentSidebar } from '../../elements';
import { usePageContext } from '../../../app/context/page';

import './talentProfile.scss';

const TalentProfileSection = ({ data }) => {
  const { breadcrumbs } = usePageContext();

  return (
    <div className="talent-profile__section">
      <i className="talent-profile__decor" />
      { breadcrumbs && <Breadcrumbs items={ breadcrumbs } /> }
      <div className="container">
        <div className="talent-profile__block">
          <TalentSidebar data={ data } />
          <TalentContent data={ data } />
        </div>
      </div>
    </div>
  );
};

export default TalentProfileSection;