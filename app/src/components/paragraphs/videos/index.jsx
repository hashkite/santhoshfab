import React, { useState } from 'react';

import { VideosItem } from '../../elements';

import './videos.scss';

const Videos = ({ data }) => {
  const { items } = data?.paragraphs || {};
  const [ifModalOpen, setIfModalOpen] = useState(false);

  return (
    <div className={`videos__section${ifModalOpen ? ' active' : ''}`}>
      <div className="videos__lines" />
      <div className="container">
        {items && (
          <div className="videos__list">
            <div className="videos__list-inner">
              {items.map(item => (
                <VideosItem
                  setIfModalOpen={setIfModalOpen}
                  key={item?.id}
                  data={item}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Videos;
