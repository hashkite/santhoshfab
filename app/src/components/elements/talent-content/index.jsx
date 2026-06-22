import React from 'react';

import './talentContent.scss';
import Icon from '../svg/icon';
import Picture from '../picture';

function getYearString(value) {
  if (value === 1) {
    return 'year';
  } else {
    return 'years';
  }
}

function convertToYear(value) {
  const date = new Date(value * 1000);
  const year = date.getFullYear();
  return year;
}

function formattedDate(value) {
  const date = new Date(value * 1000);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formatDate = date.toLocaleDateString('en-US', options);
  return formatDate;
}

const TalentContent = ({ data }) => {
  const {
    availablity,
    description,
    experience,
    familiar_with,
    location,
    portfolio,
    role,
    time_zone,
    title,
    toptal_member_since,
    work_experience,
  } = data || {};

  return (
    <div className="talent-content__wrapper">
      <div className="talent__header">
        {role?.items?.[0] && (
          <div className="talent__role">{role.items[0]}</div>
        )}
        <div className="talent__title">
          <h1>{title}</h1>
        </div>
        {(location?.value ||
          availablity?.value ||
          toptal_member_since?.value ||
          time_zone?.value) && (
          <div className="talent__icons">
            {location?.value && (
              <div className="talent__icons-item">
                <div className="talent__icons-col">
                  <div className="icon">
                    <Icon
                      icon="location"
                      color="#DD9A34"
                      height="27px"
                      width="20px"
                    />
                  </div>
                  <div className="title">{location.label}</div>
                </div>
                <div className="talent__icons-col">
                  <div className="value">{location.value}</div>
                </div>
              </div>
            )}
            {availablity?.value && (
              <div className="talent__icons-item">
                <div className="talent__icons-col">
                  <div className="icon">
                    <Icon
                      icon="availablity"
                      color="#DD9A34"
                      height="33px"
                      width="33px"
                    />
                  </div>
                  <div className="title">{availablity.label}</div>
                </div>
                <div className="talent__icons-col">
                  <div className="value">{availablity.value}</div>
                </div>
              </div>
            )}
            {toptal_member_since?.value && (
              <div className="talent__icons-item">
                <div className="talent__icons-col">
                  <div className="icon">
                    <Icon
                      icon="famaash-member"
                      color="#DD9A34"
                      height="25px"
                      width="28px"
                    />
                  </div>
                  <div className="title">{toptal_member_since.label}</div>
                </div>
                <div className="talent__icons-col">
                  <div className="value">
                    {formattedDate(toptal_member_since.value)}
                  </div>
                </div>
              </div>
            )}
            {time_zone?.value && (
              <div className="talent__icons-item">
                <div className="talent__icons-col">
                  <div className="icon">
                    <Icon
                      icon="timezone"
                      color="#DD9A34"
                      height="32px"
                      width="32px"
                    />
                  </div>
                  <div className="title">{time_zone.label}</div>
                </div>
                <div className="talent__icons-col">
                  <div className="value">{time_zone.value}</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="talent__content">
        {description?.value && (
          <div
            className="talent__description"
            dangerouslySetInnerHTML={{ __html: description.value }}
          />
        )}
        {familiar_with?.items && (
          <div className="talent__content-block">
            <div className="talent__content-header">
              <h2>{familiar_with.label}</h2>
            </div>
            {familiar_with?.items && (
              <div className="talent__content-icons">
                {familiar_with.items.map(item => (
                  <div className="talent__content-icon" key={item?.id}>
                    {item.image.items[0]?.src && (
                      <Picture image={item.image.items[0]} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {portfolio?.items && (
          <div className="talent__content-block">
            <div className="talent__content-header">
              <h2>{portfolio.label}</h2>
            </div>
            {portfolio?.items && (
              <div className="talent__content-portfolio">
                {portfolio.items.map(item => (
                  <div
                    className="talent__content-portfolio-item"
                    key={item?.id}
                  >
                    <div className="title">
                      <h3>{item?.title?.value}</h3>
                    </div>
                    {item?.description?.value && (
                      <div
                        className="value"
                        dangerouslySetInnerHTML={{
                          __html: item.description.value,
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {experience?.items && (
          <div className="talent__content-block">
            <div className="talent__content-header">
              <h2>{experience.label}</h2>
            </div>
            <div className="talent__content-experience">
              {experience.items.map(item => (
                <div className="talent__content-experience-item" key={item?.id}>
                  {item?.technology?.items?.[0]?.image?.items?.[0]?.src && (
                    <div className="icon">
                      <Picture
                        image={item.technology.items[0].image.items[0]}
                      />
                    </div>
                  )}
                  <div className="content">
                    <div className="title-and-description">
                      <div className="title">
                        {item?.technology?.items?.[0]?.title && (
                          <h3>{item.technology.items[0].title}</h3>
                        )}
                      </div>
                      {item?.technology?.items?.[0]?.description?.value && (
                        <div
                          className="description"
                          dangerouslySetInnerHTML={{
                            __html: item.technology.items[0].description.value,
                          }}
                        />
                      )}
                    </div>
                    {item?.years?.value && (
                      <div className="years">{`${
                        item.years.value
                      } ${getYearString(item.years.value)}`}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {work_experience?.items && (
          <div className="talent__content-block">
            <div className="talent__content-header">
              <h2>{work_experience.label}</h2>
            </div>
            <div className="talent__content-work-exp">
              {work_experience.items.map(item => (
                <div className="talent__content-work-exp-item" key={item?.id}>
                  <div className="work-exp-item__content">
                    {item?.title?.value && (
                      <div className="work-exp-item__header">
                        {item?.company?.items?.[0]?.image?.items?.[0]?.src && (
                          <div className="work-exp-item__pic">
                            <Picture
                              image={item.company.items[0].image.items[0]}
                            />
                          </div>
                        )}
                        <div className="work-exp-item__title-co">
                          <h3>{item.title.value}</h3>
                          {item?.subtitle?.value && (
                            <div className="work-exp-item__co">
                              {item.subtitle.value}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {item?.description?.value && (
                      <div
                        className="work-exp-item__desc"
                        dangerouslySetInnerHTML={{
                          __html: item.description.value,
                        }}
                      />
                    )}
                    {item?.technologies?.items && (
                      <div className="work-exp-item__tags">
                        {item.technologies.items.map((item, index) => (
                          <div key={index} className="work-exp-item__tag">
                            {item}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {item?.start_date && (item?.present || item?.end_date) && (
                    <div className="work-exp-item__years">
                      {`${convertToYear(item.start_date)} - ${
                        item.present
                          ? 'Present'
                          : item.end_date
                          ? convertToYear(item.end_date)
                          : ''
                      }`}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TalentContent;
