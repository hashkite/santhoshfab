import React from 'react';

const PostsFilters = ({ filters, params, onSetParam }) => {
  const { default_value, name, options } = filters || {};

  return (
    <>
      {filters && (
        <div className="filters__block">
          <div className="filters__list">
            {default_value && (
              <button 
                className={`btn filters__btn ${!(name in params) ? 'active' : ''}`}
                onClick={(e) => {
                  onSetParam(e, name, null);
                }}
              >
                {default_value}
              </button>
            )}
            {options && options.map(({ key, value }) => (
              <button 
                className={`btn filters__btn ${name in params && params[name] === key ? 'active' : ''}`}
                key={key}
                onClick={(e) => {
                  onSetParam(e, name, key);
                }}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default PostsFilters