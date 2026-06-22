import React, { useState, useEffect } from 'react';
import './articleInfo.scss';
import { Button, Picture } from '../';

const ArticleInfo = ({ date, author, type, technologies, sub_service }) => {
  const [formattedDate, setFormattedDate] = useState(null);
  const { title, image } = author?.items?.[0] || {};

  useEffect(() => {
    if (date) {
      const newDate = new Date(date * 1000);
      const formatDate = newDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      setFormattedDate(formatDate);
    }
  }, [date]);

  return (
    <>
      {type !== 'large' && sub_service?.items?.[0] && (
        <div className="article-info__sub-services">
          <h2>{'Services offered:'}</h2>
          {sub_service.items.map(item => (
            <Button key={item.id} data={item} />
          ))}
        </div>
      )}
      {type !== 'large' && technologies?.items?.[0] && (
        <div className="article-info__technologies">
          <h2>{'Technologies used:'}</h2>
          {technologies.items.map(item => (
            <span key={item.id}>
              {(item?.image?.items?.[0]?.svg && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.image.items[0].svg,
                  }}
                />
              )) ||
                (item?.image?.items?.[0]?.src && (
                  <Picture image={item.image.items[0]} />
                ))}
              {item?.title}
            </span>
          ))}
        </div>
      )}
      <div className={`article-info__block${type ? ' --type-' + type : ''}`}>
        {(title || image) && (
          <div className="article-info__author">
            {image?.items?.[0]?.src && (
              <Picture className="author__pic" image={image.items[0]} />
            )}
            {title && (
              <div className="author__name">
                {type !== 'large' && <div className="title">Written by</div>}
                <div className="name">{title}</div>
              </div>
            )}
          </div>
        )}
        {formattedDate && (
          <div className="article-info__date">Updated {formattedDate}</div>
        )}
      </div>
    </>
  );
};

export default ArticleInfo;
