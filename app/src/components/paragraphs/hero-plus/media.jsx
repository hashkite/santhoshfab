export const Media = ({ src, name, type, svg }) => {
  if (!src) return null;

  if (type === 'video') {
    return (
      <video
        src={src}
        loop={true}
        autoPlay={true}
        muted={true}
        playsInline={true}
        className="hero-plus__media video"
      />
    );
  }

  if (svg) {
    return <div className="svg" dangerouslySetInnerHTML={{ __html: svg }} />;
  }

  return <img src={src} alt={name} className="hero-plus__media image" />;
};
