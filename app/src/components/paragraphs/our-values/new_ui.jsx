import { HtmlField, Mapper } from 'shared/ui';
import { NewUiItem } from './new_ui_item';
import { Path } from './paths';
import './style_new.scss';

export const NewUi = ({ title, paragraphs }) => {
  return (
    <div aria-label="our_values" className="our-values__new_ui">
      <HtmlField text={title} Tag="h2" />
      <div className="container">
        <Path />
        <Mapper
          className="our-values__new_ui__grid"
          array={paragraphs}
          children={NewUiItem}
        />
      </div>
    </div>
  );
};
