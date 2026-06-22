import { useRef } from 'react';
import { Mapper } from '../../../shared/ui';
import useHirePopupAnimation from './animation';
import Item from './item';
import './style.scss';

const HirePopup = ({ paragraphs, title }) => {
  const ref = useRef();
  useHirePopupAnimation(ref);
  return (
    <section ref={ref} className="hire-popup">
      {title && <h1 className="title">{title?.value}</h1>}
      <Mapper
        array={paragraphs}
        children={Item}
        className={'grid gap-10 hire-list'}
      />
    </section>
  );
};

export default HirePopup;
