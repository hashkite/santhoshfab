import classNames from 'classnames';
import { Button, Picture } from '../../elements';
import './team.scss';

const Team = ({ data }) => {
  const {
    description,
    link,
    multicolor_title,
    top_title,
    internal_id,
    without_decor,
  } = data;

  return (
    <div
      className={classNames('team position-relative', {
        without_decor: without_decor,
      })}
      id={`section-${internal_id}`}
    >
      {data?.background_image?.items?.[0]?.src && (
        <div className="team__img">
          <Picture image={data.background_image?.items?.[0]} />
        </div>
      )}
      <div className="team__content position-relative container">
        <div className="row">
          <div className="col-md-7">
            {top_title?.value && (
              <div
                className="team__title-top"
                dangerouslySetInnerHTML={{ __html: top_title.value }}
              />
            )}
            {multicolor_title?.value && (
              <div
                className="team__title"
                dangerouslySetInnerHTML={{ __html: multicolor_title.value }}
              />
            )}
            {description?.value && (
              <div
                className="team__description"
                dangerouslySetInnerHTML={{ __html: description.value }}
              />
            )}
            {link?.items && (
              <Button
                className="team__link btn btn-secondary"
                data={link?.items?.[0]}
              >
                <span />
              </Button>
            )}
          </div>
        </div>
      </div>
      {!without_decor && (
        <div className="team__decor">
          <svg width="1920" height="150" viewBox="0 0 1920 150" fill="none">
            <path d="M0 150 C640 0 1280 0 1920 150" fill="#F8FBFF" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Team;
