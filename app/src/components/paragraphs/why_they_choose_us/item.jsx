import { Picture } from 'components/elements';
import { HtmlField } from 'shared/ui';

export const Tiles = ({ title, description, icon }) => {
  const iconAttributes = icon?.items?.[0];

  return (
    <div className="tiles">
      <div className="tiles__icon">
        {iconAttributes?.src && <Picture image={iconAttributes} />}
      </div>
      <div className="tiles__content">
        <HtmlField text={title} Tag="h3" className="tiles__title" />
        <HtmlField text={description} className="tiles__description" />
      </div>
    </div>
  );
};
