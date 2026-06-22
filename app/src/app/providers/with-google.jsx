import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { RECAPTCHA_KEY } from 'shared/config';

export const withGoogle = component => () =>
  (
    <GoogleReCaptchaProvider
      reCaptchaKey={RECAPTCHA_KEY}
      scriptProps={{
        async: false, // optional, default to false,
        defer: false, // optional, default to false
      }}
    >
      {component()}
    </GoogleReCaptchaProvider>
  );
