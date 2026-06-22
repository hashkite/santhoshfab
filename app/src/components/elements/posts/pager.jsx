import React from 'react';

import { Button } from '../';
import { Icon } from '../svg';

const Pager = ({ data }) => {
  const { total_items, items_per_page, current_page } = data || {};

  return (
    <div className="pager__block">
      <div className="pager__info">
        <div className="text">{items_per_page * (current_page+1)} out of {total_items} seen</div>
      </div>
      <div className="pager__button">
        <Button
          className="btn btn-primary"
          data={{
            title: "Show more insights"
          }}
        >
          <div className="icon">
            <Icon 
              icon="arrow--right"
              color="white"
              height="12px"
              width="12px"
            />
          </div>
        </Button>
      </div>
    </div>
  )
}

export default Pager