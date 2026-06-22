import React from 'react';

import { Button } from '../';
import { Icon } from '../svg';

const SubmitField = ({ title = 'Submit', type }) => {
  return (
    <div className={`field field-${type}`}>
      <Button type="submit" className="btn btn-secondary">
        <div className="icon">
          <Icon
            icon="arrow--long--right"
            color="white"
            height="12px"
            width="22px"
          />
        </div>
        <span className="text">{title}</span>
      </Button>
    </div>
  );
};

export default SubmitField;
