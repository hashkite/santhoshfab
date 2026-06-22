import { HtmlField, Mapper } from 'shared/ui';

export const Slide = ({ title, description, icon }) => {
  return (
    <div className="slider__item">
      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 left_column">
        <HtmlField text={title} Tag="h4" className="slider__item-title" />
        <HtmlField text={description} className="slider__item-description" />
      </div>
      <Mapper array={icon} className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        {props => <img alt="" className="slider__item-icon" {...props} />}
      </Mapper>
    </div>
  );
};
