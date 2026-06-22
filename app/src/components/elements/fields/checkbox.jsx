import React from 'react';

const Checkbox = ({
  title,
  type,
  name,
  required,
  onChange,
}) => {
  return (
    <div className={`field field-${type}`}>
      {title && (
        <label htmlFor={name}>
          <input
            type={type}
            required={required}
            id={name}
            name={name}
            onChange={onChange}
          />
          <i />
          <span dangerouslySetInnerHTML={{ __html: `${title}${required ? '<span className="text-error"> *</span>' : ''}` }} />
        </label>
      )}
    </div>
  )
}

export default Checkbox
