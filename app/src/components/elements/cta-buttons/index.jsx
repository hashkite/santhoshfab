import React from 'react';
import Button from '../button';
import './cta-buttons.scss';

/**
 * CTA Buttons Component
 * Renders a responsive container of CTA buttons with intelligent styling
 *
 * @param {Object} props - Component props
 * @param {Array} props.items - Array of CTA button objects with url, title, external properties
 * @param {string} [props.variant='smart'] - Button style variant:
 *   - 'smart': Single CTA = secondary, Multiple = first secondary + rest white-border
 *   - 'secondary': All buttons use btn-secondary (yellow background)
 *   - 'white-border': All buttons use btn-white-border (transparent with border)
 *   - 'mixed': Alternates between secondary and white-border
 * @param {string} [props.className] - Additional CSS classes for container
 * @param {string} [props.containerClass] - Custom class name for outer container (overrides default)
 *
 * @returns {React.ReactElement|null} - Rendered CTA buttons or null if no items
 *
 * @example
 * // Single CTA - renders with secondary style
 * <CTAButtons items={[{ url: '/', title: 'Click me', external: false }]} />
 *
 * @example
 * // Multiple CTAs - first secondary, rest white-border
 * <CTAButtons
 *   items={[
 *     { url: '/contact', title: 'Contact', external: false },
 *     { url: '/learn', title: 'Learn More', external: false }
 *   ]}
 * />
 *
 * @example
 * // All secondary style
 * <CTAButtons
 *   items={ctaItems}
 *   variant="secondary"
 * />
 *
 * @example
 * // Custom styling
 * <CTAButtons
 *   items={ctaItems}
 *   variant="smart"
 *   className="my-custom-class"
 * />
 */
const CTAButtons = ({
  items = [],
  variant = 'smart',
  className = '',
  containerClass = '',
}) => {
  // Return null if no items
  if (!items || items.length === 0) {
    return null;
  }

  /**
   * Determine button class based on variant and index
   * @param {number} index - Button index
   * @param {number} total - Total number of buttons
   * @returns {string} - CSS class string
   */
  const getButtonClass = (index, total) => {
    switch (variant) {
      case 'secondary':
        return 'btn btn-secondary';

      case 'white-border':
        return 'btn btn-white-border';

      case 'mixed':
        return index % 2 === 0 ? 'btn btn-secondary' : 'btn btn-white-border';

      case 'smart':
      default:
        // Single CTA = secondary, Multiple = first secondary + rest white-border
        if (total === 1) {
          return 'btn btn-secondary';
        }
        return index === 0 ? 'btn btn-secondary' : 'btn btn-white-border';
    }
  };

  const containerClassName = containerClass || `cta-buttons cta-buttons--${variant} ${className}`;

  return (
    <div className={containerClassName}>
      {items.map((button, index) => {
        const buttonClass = getButtonClass(index, items.length);

        return (
          <Button
            key={index}
            data={{
              title: button.title,
              url: button.url,
              path: button.path,
              external: button.external,
              target: button.external ? '_blank' : null,
            }}
            className={buttonClass}
            fake={false}
          >
            {null}
          </Button>
        );
      })}
    </div>
  );
};

export default CTAButtons;
