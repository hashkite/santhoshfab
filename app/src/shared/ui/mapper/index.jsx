import { Fragment } from 'react';

const WithClassName = ({ className, children }) => {
  if (!className) return children;

  return <div className={className}>{children}</div>;
};

const arrayTransform = array => {
  if (!array) return undefined;

  if ('items' in array) return array.items;

  return array;
};

export const Mapper = ({
  array,
  children: ChildComponent,
  Separator = null,
  communicate = null,
  className = undefined,
}) => {
  const tArray = arrayTransform(array);

  if (!tArray || !tArray.length) return communicate;

  return (
    <WithClassName className={className}>
      {tArray.map(({ key, ...item }, index) => (
        <Fragment key={index}>
          <ChildComponent
            {...item}
            key_field={key}
            index={index}
            array_length={tArray.length}
          />
          {Separator && index < tArray.length - 1 && <Separator />}
        </Fragment>
      ))}
    </WithClassName>
  );
};
