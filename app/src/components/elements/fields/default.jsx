import React from 'react';

import { Icon } from '../svg';

const DefaultField = ({
  title,
  isRequired,
  type,
  name,
  placeholder,
  required,
  tooltip,
  onChange,
}) => {
  return (
    <div className={`field field-${type}`}>
      {type === 'email' && (
        <div className="icon">
          <Icon icon="email" height="22px" width="27px" color="#D1D7E1" />
        </div>
      )}
      {name === 'name' && (
        <div className="icon">
          <Icon icon="user" height="29px" width="28px" color="#D1D7E1" />
        </div>
      )}
      {title && (
        <label htmlFor={name}>
          {title}
          {required && <span className="text-error"> *</span>}
        </label>
      )}
      <input
        placeholder={placeholder}
        type={type === 'textfield' ? 'text' : type}
        required={required || isRequired}
        id={name}
        name={name}
        onChange={onChange}
      />
      {tooltip && (
        <div
          className="field-description"
          dangerouslySetInnerHTML={{ __html: tooltip }}
        />
      )}
    </div>
  );
};

export default DefaultField;
