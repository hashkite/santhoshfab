import classNames from 'classnames';

/**
 * @param {Object} textParams - Parameters for text field.
 * @param {*} textParams.text - Could be string or object with label and value.
 * @param {*=} textParams.LabelTag - Tag for label.
 * @param {*=} textParams.Tag - Tag for value.
 * @param {string=} textParams.labelClassName - Class name for label.
 * @param {string=} textParams.className - Class name for value.
 * @param {string=} textParams.containerClassName - Class name for container.
 * @param {function=} textParams.onClick - Click handler for value.
 * @param {Object=} textParams.children - Children.
 */
export const HtmlField = ({
  text,
  LabelTag = 'div',
  Tag = 'div',
  className,
  labelClassName,
  containerClassName,
  children,
}) => {
  if (!text) return null;

  const { label, value } = text;

  if (!label && !value)
    return (
      <Tag className={className} dangerouslySetInnerHTML={{ __html: text }} />
    );

  if (!label && value)
    return (
      <Tag className={className} dangerouslySetInnerHTML={{ __html: value }} />
    );

  return (
    <div className={classNames('text-field', containerClassName)}>
      {label && <LabelTag className={labelClassName}>{label}</LabelTag>}
      {value && (
        <Tag
          className={className}
          dangerouslySetInnerHTML={{ __html: value }}
        />
      )}
      {children}
    </div>
  );
};
