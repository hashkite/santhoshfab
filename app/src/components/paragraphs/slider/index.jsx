import circle from './circle';
import SliderDefault from './default';
import huge_title from './huge_title';
import services from './services';
import talent from './talent';

const variations = {
  huge_title,
  services,
  talent,
  circle,
};

const Slider = ({ data }) => {
  const SliderComponent = variations[data.slider_type?.value] || SliderDefault;

  return <SliderComponent {...data} />;
};

export default Slider;
