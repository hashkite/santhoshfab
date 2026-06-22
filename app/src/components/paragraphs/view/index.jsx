import { Posts, PostsCarousel, TeamGrid } from '../../elements/';

import './view.scss';

const View = ({ data }) => {
  const {
    description,
    multicolor_title,
    view,
    id: paragraph_id,
    style,
  } = data || {};

  return (
    <div
      className={`view__section${
        view?.view?.display_id && view?.view?.target_id
          ? ' --view-' + view?.view?.display_id + '-' + view?.view?.target_id
          : ''
      }${style?.value ? ' --style-' + style.value : ''}`}
    >
      {style?.value === 'round_top_corner' && (
        <div className="view__decor">
          <svg
            width="1920"
            height="174"
            viewBox="0 0 1920 174"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0H1920V174C1920 174 1629.5 4.5 960 4.5C290.5 4.5 0 174 0 174V0Z"
              fill="#F8FBFF"
            />
          </svg>
        </div>
      )}
      <div className="container">
        <div className="view__header">
          {multicolor_title?.value && (
            <div dangerouslySetInnerHTML={{ __html: multicolor_title.value }} />
          )}
          {description?.value && (
            <div
              className="view__header-description"
              dangerouslySetInnerHTML={{ __html: description.value }}
            />
          )}
        </div>
        <div className="view__content">
          {(view?.view?.display_id === 'intriguing_perspectives' ||
            view?.view?.display_id === 'similar_articles') &&
            view?.view?.target_id === 'articles' &&
            view?.rows && <Posts view={view} />}
          {(view?.view?.display_id === 'all' ||
            view?.view?.display_id === 'block_1') &&
            view?.view?.target_id === 'articles' &&
            view?.rows && (
              <Posts
                paragraph_id={paragraph_id}
                type="insights-all"
                filters={view.view.display_id === 'all'}
                view={view}
              />
            )}
          {view?.view?.display_id === 'case_studies' &&
            view?.view?.target_id === 'case_studies' &&
            view?.rows && <PostsCarousel items={view?.rows} />}
          {view?.view?.display_id === 'block_1' &&
            view?.view?.target_id === 'exceptional_talent' &&
            view?.rows && <TeamGrid paragraph_id={paragraph_id} view={view} />}
        </div>
      </div>
    </div>
  );
};

export default View;
