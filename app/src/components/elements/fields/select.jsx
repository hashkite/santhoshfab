import React, { useState } from 'react';

const SelectField = ({
  options,
  name,
  type,
  multiple,
  required,
  description,
  onChange,
  empty_option,
  empty_value,
  isRequired,
  triggerSubmit,
  title,
}) => {
  const [ selectedOption, setSelectedOption ] = useState(empty_value);

  if (options) {
    return (
      <div className={ `field field-${type}` }>
        { title && (
          <label htmlFor={ name }>
            { title }
            { required && <span className="text-error"> *</span> }
          </label>
        ) }
        <select
          multiple={ multiple }
          required={ required || isRequired }
          id={ name }
          name={ name }
          onChange={ (e) => {
            const { name, value } = e.target;
            setSelectedOption(e.target.value);
            onChange(e);
            triggerSubmit(name, value);
          } }
          value={ selectedOption }
        >
          { empty_option && <option value={ empty_value }>{ empty_option }</option> }
          { Object.keys(options).map(key => (
            <option key={ key } value={ key }>
              { options[ key ] }
            </option>
          )) }
        </select>
        { description && (
          <div className="field-select-links">
            <div className="field-select-title">E.g</div>
            { Object.keys(description).map((item) => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
              <div
                key={ item }
                className="field-select-links__item"
                onClick={ () => {
                  setSelectedOption(item);
                  triggerSubmit(name, item);
                } }
              >{ description[ item ] }</div>
            )) }
          </div>
        ) }
      </div>
    );
  }
  return;
};

export default SelectField;
