import { OurModelBlock } from '../../elements';

import classNames from 'classnames';
import OurModelBlockNew from 'components/elements/our-model-block/new-index';
import './ourModel.scss';

const OurModel = ({ data }) => {
  const { description, multicolor_title, paragraphs, new_ui } = data || {};

  const Item = new_ui ? OurModelBlockNew : OurModelBlock;

  return (
    <section className={classNames('our-model__section', new_ui && 'new_ui')}>
      <div className="container">
        {multicolor_title?.value && (
          <div className="our-model__header">
            <div dangerouslySetInnerHTML={{ __html: multicolor_title.value }} />
            {description?.value && (
              <div
                className="our-model__description"
                dangerouslySetInnerHTML={{ __html: description.value }}
              />
            )}
          </div>
        )}
        {paragraphs?.items && <Item items={paragraphs.items} />}
      </div>
    </section>
  );
};

export default OurModel;
