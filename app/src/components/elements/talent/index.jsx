import { HtmlField } from 'shared/ui';
import { Icon } from '../svg';
import { Path } from './path';
import './style.scss';

const getYearOfExperience = (experience, chosen_tech) => {
  if (!experience || !chosen_tech) return null;
  if (experience.items?.length === 0) return null;
  const currentExperience = experience?.items?.find(
    ({ technology }) =>
      technology?.items?.[0]?.title.toLowerCase() === chosen_tech?.toLowerCase()
  );
  if (!currentExperience) return null;
  return currentExperience.years.value;
};

export const Talent = ({
  image,
  flag,
  title,
  expertise,
  time_zone,
  chosen_tech,
  experience,
  role,
  color = 'brand-blue',
}) => {
  const yerExperience = getYearOfExperience(experience, chosen_tech);
  const flagAttributes = flag?.items?.[0];
  const imageAttributes = image?.items?.[0];

  return (
    <div className={`talent type-${color}`} dir="ltr">
      {imageAttributes && (
        <img alt="talent" {...imageAttributes} className="talent__image" />
      )}
      <div className="talent__content">
        {role && role?.items.length > 0 && (
          <div className="talent_positions">
            {role.items.map((item, index) => (
              <div key={index} className={`talent__position ${color}`}>
                {item}
              </div>
            ))}
          </div>
        )}
        <div className="talent__header_title">
          {flagAttributes && (
            <img alt={'flag'} {...flagAttributes} className={'talent__flag'} />
          )}
          <HtmlField text={title} className="talent__title" />
          <Path color={color} />
        </div>

        <div className="talent__details">
          <div className="talent__experience">
            <div className="talent__experience-label">Experience</div>
            <div className="talent__experience-value">
              {yerExperience ? `${yerExperience} years` : 'N/A'}
            </div>
          </div>
          <div className="talent__time_zone">
            <div className="talent__time_zone-label">Time Zone</div>
            <HtmlField text={time_zone} className="talent__time_zone-value" />
          </div>
        </div>
        <div className="talent__expertise">
          {expertise?.items &&
            expertise.items.map((item, index) => (
              <div key={index} className="talent__expertise-item">
                {item}
              </div>
            ))}
          <a href="/hire" target="_blank" className="talent__hire-button">
            <span>Hire</span>
            <Icon
              icon="arrow--top--right"
              color="#DD9A34"
              height="10px"
              width="10px"
            />
          </a>
        </div>
      </div>
    </div>
  );
};
