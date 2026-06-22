import React from 'react';

import { Picture } from '../';

const TeamFilter = ({ filters, params, onSetParam }) => {
  const { name, options } = filters || {};

  return (
    <>
      { filters && (
        <div className="team-grid-filters__block">
          <div className="team-grid-filters__list">
            { options && options.map(({ key, value, image }) => (
              <button
                className={ `btn team-grid-filters__btn ${name in params && params[ name ] === key ? 'active' : ''}` }
                key={ key }
                onClick={ (e) => {
                  onSetParam(e, name, key);
                } }
              >
                { image && (
                  <Picture className="team-grid-filters__pic" image={ image } />
                ) }
                { value }
              </button>
            )) }
          </div>
        </div>
      ) }
    </>
  );
};

export default TeamFilter;
