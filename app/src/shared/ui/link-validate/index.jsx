import { Link } from 'react-router-dom';

const getLinkAttrs = ({
  className,
  l_classes,
  class: o_class,
  target,
  external,
  url,
  path,
  is_front,
  ...otherAttributes
}) => {
  const path_url = path || url;

  return {
    className: `${className} ${l_classes} ${o_class}`,
    target: target ? target : null,
    to: external ? null : path_url,
    href: external ? path_url : null,
    ...otherAttributes,
  };
};

const getLinkComponent = ({ external, url, path, onClick }) => {
  const path_url = path || url;

  // return !path_url ? 'span' : external ? 'a' : Link

  if (onClick) return 'button';
  if (!path_url) return 'span';
  if (external) return 'a';
  else return Link;
};

const useGetComponentAttributes = componentAttributes => {
  const { url, path, external, onClick } = componentAttributes;

  const attributes = getLinkAttrs(componentAttributes);

  const LinkComponent = getLinkComponent({ external, url, path, onClick });

  return { attributes, LinkComponent };
};

export const LinkValidate = ({ title = '', children, ...otherLinkData }) => {
  const { attributes, LinkComponent } =
    useGetComponentAttributes(otherLinkData);

  return <LinkComponent {...attributes}>{children || title}</LinkComponent>;
};
