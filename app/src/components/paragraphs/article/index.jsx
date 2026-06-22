import React, { useEffect, useState } from 'react';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
} from 'react-share';

import { getData } from '../../../shared/api';
import { View } from '../';
import { ArticleInfo } from '../../elements';
import { Icon } from '../../elements/svg';
import CopyButton from './copyBtn';

import './article.scss';

const Article = ({ data }) => {
  const { data: similarArticles } = getData(
    'fetch/config_pages/article_similar'
  );
  const {
    body,
    author,
    date,
    title,
    teaser_text,
    node_id,
    tags,
    sub_service,
    technologies,
  } = data || {};
  const { data: similarArticlesPosts } =
    tags?.value && node_id
      ? getData(
          `search-by-tag/articles/similar_articles/${tags?.value}/${node_id}`
        )
      : {};
  const [currentUrl, setCurrentUrl] = useState(null);

  const { description, multicolor_title } = similarArticles?.data || {};

  const convertToHtmlId = str => {
    return str.replace(/\s+/g, '-').toLowerCase();
  };

  const createTableOfContents = htmlString => {
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    const headings = doc.querySelectorAll('h3');

    const tocItems = Array.from(headings).map((heading, index) => {
      const headingText = heading.innerText;
      const headingId = convertToHtmlId(headingText);

      return (
        <li key={index}>
          <a href={`#${headingId}`}>{headingText}</a>
        </li>
      );
    });

    return tocItems.length > 0 ? <ol>{tocItems}</ol> : null;
  };

  const parseAndModifyHTML = htmlString => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    const h3Elements = doc.querySelectorAll('h3');
    h3Elements.forEach(h3 => {
      const headingText = h3.innerText;
      const id = convertToHtmlId(headingText);
      h3.setAttribute('id', id);
    });
    const modifiedHTMLString = new XMLSerializer().serializeToString(doc);
    return modifiedHTMLString;
  };

  const tableOfContents = body?.value ? createTableOfContents(body?.value) : '';
  const modifiedBody = body?.value ? parseAndModifyHTML(body?.value) : '';

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  return (
    <>
      <div className="article__section">
        <div className="container">
          <div className="article__content">
            {body?.value && (
              <div
                className="article__body"
                dangerouslySetInnerHTML={{ __html: modifiedBody }}
              />
            )}
            {(author || date) && (
              <div className="article__info">
                <ArticleInfo
                  author={author}
                  type="large"
                  sub_service={sub_service}
                  technologies={technologies}
                />
              </div>
            )}
            {currentUrl && (
              <div className="article__sidebar-wrap">
                <div className="article__sidebar">
                  <div className="article__sidebar-title">
                    {'Browse through'}
                  </div>
                  <div className="article__sidebar-toc">{tableOfContents}</div>
                  <div className="article__share-block">
                    <div className="share__buttons">
                      <EmailShareButton
                        url={currentUrl}
                        subject={title}
                        body={teaser_text?.value}
                        className="share__button"
                      >
                        <Icon
                          icon="email"
                          height="14px"
                          width="14px"
                          color="#171A1E"
                        />
                      </EmailShareButton>
                      <FacebookShareButton
                        url={currentUrl}
                        subject={title}
                        body={teaser_text?.value}
                        className="share__button"
                      >
                        <Icon
                          icon="fb-2"
                          height="14px"
                          width="14px"
                          color="#171A1E"
                        />
                      </FacebookShareButton>
                      <LinkedinShareButton
                        url={currentUrl}
                        title={title}
                        summary={teaser_text?.value}
                        className="share__button"
                      >
                        <Icon
                          icon="ln"
                          height="14px"
                          width="14px"
                          color="#171A1E"
                        />
                      </LinkedinShareButton>
                      <CopyButton />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {similarArticlesPosts?.data && (
        <View
          data={{
            description,
            multicolor_title,
            view: similarArticlesPosts.data,
          }}
        />
      )}
    </>
  );
};

export default Article;
