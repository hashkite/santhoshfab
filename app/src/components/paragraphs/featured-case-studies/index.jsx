import React from 'react';
import BusinessNeeds from '../business-needs';

const FeaturedCaseStudies = ({ data }) => {
  const { case_studies: business_teasers, multicolor_title } = data;

  return (
    <div className="featured-case-studies">
      <BusinessNeeds
        data={{
          business_teasers,
          multicolor_title,
        }}
      />
    </div>
  );
};

export default FeaturedCaseStudies;
