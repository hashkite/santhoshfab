function getEnvVar(key) {
  if (import.meta.env && import.meta.env[key]) {
    return import.meta.env[key];
  }
  return '';
}

export const IS_PRODUCTION = import.meta.env.PROD || false;

function getOrigin() {
  if (typeof window !== 'undefined' && window.location) {
    return window.location.origin;
  }
  return '';
}

export const API_URL = IS_PRODUCTION
  ? getOrigin()
  : getEnvVar('VITE_APP_API_URL');

export const GA_ID = getEnvVar('VITE_APP_GA_ID');
export const RECAPTCHA_KEY = getEnvVar('VITE_APP_CAPTCHA_SITE_KEY');

export const MEDIA_URL = API_URL + '/media';

export const USER_PAGE_PATH = 'talent-profile';
