import { Mapper } from 'shared/ui';
import { CardItem } from './item';
import './style.scss';

const AboutUsCards = ({ data }) => {
  const array = data?.images?.items?.[0]?.paragraphs?.items;

  return (
    <div id="contact-us" className="about-us-cards">
      <Mapper
        className="container about-us-cards__grid"
        array={array}
        children={CardItem}
      />
    </div>
  );
};

export default AboutUsCards;
