import classNames from 'classnames';
import Checkbox from './checkbox';
import DefaultField from './default';
import './fields.scss';
import FieldMarkup from './markup';
import SelectField from './select';
import SubmitField from './submit';
import TextAreaField from './textarea';

const FieldSwitcher = (data, onChange, isRequired) => {
  const { type, markup } = data;

  if (type === 'webform_actions' || type === 'webform_actions_subscribe')
    return <SubmitField {...data} />;
  if (type === 'select')
    return (
      <SelectField isRequired={isRequired} onChange={onChange} {...data} />
    );
  if (type === 'label')
    return (
      <div className={classNames('field-label', data.name)}>{data.title}</div>
    );
  if (type === 'textarea')
    return <TextAreaField onChange={onChange} {...data} />;
  if (type === 'checkbox') return <Checkbox onChange={onChange} {...data} />;
  if (type === 'webform_markup')
    return (markup && <FieldMarkup markup={markup} />) || null;
  return <DefaultField isRequired={isRequired} onChange={onChange} {...data} />;
};

export default FieldSwitcher;
