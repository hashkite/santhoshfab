import React from 'react';

const TextAreaField = ({
  name,
  placeholder,
  type,
  value,
  required,
  title,
  onChange,
}) => {
  return (
    <div className={`field field-${type}`}>
      {title && (
        <label htmlFor={name}>
          {title}
          {required && <span className="text-error"> *</span>}
        </label>
      )}
      <textarea
        required={required}
        id={name}
        rows={6}
        maxLength={500}
        cols={50}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default TextAreaField;
