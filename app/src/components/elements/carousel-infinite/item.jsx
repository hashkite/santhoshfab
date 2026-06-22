import React from 'react';
import Picture from '../picture';

const CarouselInfiniteItem = ({ data }) => {
  return (
    <div className="carousel-infinite__item">
      <Picture image={data} />
    </div>
  );
};

export default CarouselInfiniteItem;
