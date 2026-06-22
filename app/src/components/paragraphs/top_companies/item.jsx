export const Item = ({ image }) => {
  const imageAttributes = image?.items?.[0] || {};
  return (
    <div className="top_companies--item">
      {imageAttributes && (
        <img
          alt="top_companies"
          {...imageAttributes}
          className="top_companies--item-image"
        />
      )}
    </div>
  );
};
