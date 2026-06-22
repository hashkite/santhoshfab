import React from 'react';
import data from '../../data/page-not-found.json';
import Hero from './../../paragraphs/hero';

const NotFound = () => {
  return (
    <div className="not-found">
      <Hero data={data} />
    </div>
  );
};

export default NotFound;
