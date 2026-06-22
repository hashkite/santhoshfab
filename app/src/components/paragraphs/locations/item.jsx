import { HtmlField } from 'shared/ui';

const Arrow = props => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.0378 6.34317L13.6269 7.76069L16.8972 11.0157L3.29211 11.0293L3.29413 13.0293L16.8619 13.0157L13.6467 16.2459L15.0643 17.6568L20.7079 11.9868L15.0378 6.34317Z"
      fill="currentColor"
    />
  </svg>
);

const Location = ({ title, icon, state, address }) => {
  const attributes = icon?.items?.[0];
  return (
    <section className="locations__item">
      <div className="locations__item-content">
        <div className="locations__item-header">
          {attributes && (
            <img alt="" className="locations__item-icon" {...attributes} />
          )}
          <div className="locations__item-text_title">
            <HtmlField
              text={title}
              Tag="h3"
              className="locations__item-title"
            />
            <HtmlField
              text={state}
              Tag="span"
              className="locations__item-subtitle"
            />
          </div>
        </div>
        {address && (
          <>
            <HtmlField
              text={address}
              Tag={'p'}
              className="locations__item-description"
            />
            <a
              target="_blank"
              className="locations__item-get-direction"
              href={`https://www.google.com/maps/search/?api=1&query=${address?.value}`}
              rel="noreferrer"
            >
              Get directions
            </a>
          </>
        )}
      </div>
    </section>
  );
};

export const LocationsItem = ({ offices, ...props }) => {
  if (!offices || !offices?.items) return <Location {...props} />;
  return offices.items.map((office, index) => (
    <Location
      key={index}
      {...props}
      state={office.top_title}
      address={office.title}
    />
  ));
};
