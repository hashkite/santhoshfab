import classNames from 'classnames';
import { Picture } from '../../elements';
import './creativity.scss';

const Creativity = ({ data }) => {
  const { description, logos, multicolor_title, grid } = data || {};

  return (
    <section
      className={classNames('creativity__section', grid && 'with-shadow')}
    >
      <div className="container">
        {multicolor_title?.value && (
          <div className="creativity__header">
            <div dangerouslySetInnerHTML={{ __html: multicolor_title.value }} />
            {description?.value && (
              <div
                className="creativity__description"
                dangerouslySetInnerHTML={{ __html: description.value }}
              />
            )}
          </div>
        )}
        {logos?.items && (
          <div className="creativity__grid">
            {logos.items.map((item, index) => (
              <div className="creativity__item" key={index}>
                {item?.src && <Picture image={item} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Creativity;
