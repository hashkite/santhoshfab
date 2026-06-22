import React, { useState } from 'react';
import './videosItem.scss';
import Modal from '../modal';
import Picture from '../picture';

const VideosItem = ({ data, setIfModalOpen }) => {
  const { image, tags, title, video } = data || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transition, setIsModalTransition] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
    setIfModalOpen(true);
    setTimeout(() => {
      setIsModalTransition(true);
    }, 1);
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleClick();
    }
  };

  const closeModal = () => {
    setIsModalTransition(false);
    setTimeout(() => {
      setIsModalOpen(false);
      setIfModalOpen(false);
    }, 300);
  };

  return (
    <div className="videos__item">
      {video?.items?.[0] && (
        <div
          className="videos-item__video-wrapper"
          onClick={handleClick}
          role="button"
          tabIndex="0"
          onKeyDown={handleKeyDown}
        >
          <div className="videos-item__video">
            {image?.items?.[0]?.src && (
              <div className="video__placeholder">
                <Picture image={image.items[0]} />
              </div>
            )}
          </div>
        </div>
      )}
      {title?.value && (
        <div className="videos-item__header">
          <h3>{title.value}</h3>
        </div>
      )}
      <div className="videos-item__footer">
        {tags?.items && (
          <div className="videos-item__tags">
            {tags.items.map((item, index) => (
              <div className="videos-item__tag" key={index}>
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
      {isModalOpen && (
        <Modal
          className={'videos__modal'}
          transition={transition}
          closeModal={closeModal}
          data={{ video: video?.items?.[0]?.src }}
        />
      )}
    </div>
  );
};

export default VideosItem;
