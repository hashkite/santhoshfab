import React from 'react';

const FaqAccordionItem = ({ data, isActive, onToggle }) => {
  const { description, title } = data || {};

  return (
    <div className="faq-accordion__item">
      <button
        className={`faq-accordion__header ${isActive ? 'active' : ''}`}
        onClick={onToggle}
        type="button"
      >
        <span className="faq-accordion__title">{title?.value}</span>
        <span className="faq-accordion__icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </button>
      {isActive && (
        <div className="faq-accordion__content">
          {description?.value && (
            <div
              className="faq-accordion__description"
              dangerouslySetInnerHTML={{ __html: description.value }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FaqAccordionItem;
