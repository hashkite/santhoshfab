import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './picture.scss';

const Picture = ({ image, className }) => {
  const { src, webp, alt, width, height } = image || {};

  return (
    (src && (
      <picture className={className}>
        <LazyLoadImage
          effect="blur"
          srcSet={webp}
          src={src}
          alt={alt}
          width={width}
          height={height}
        />
      </picture>
    )) ||
    null
  );
};

export default Picture;
