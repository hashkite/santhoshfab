import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';
import { GA_ID } from '../config';

ReactGA.initialize(GA_ID);

export const useGoogleAnalytics = () => {
  const location = useLocation();
  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname + location.search,
    });
  }, [location]);
};
