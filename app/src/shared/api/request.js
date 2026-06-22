import { useMutation, useQuery } from 'react-query';
import { IS_PRODUCTION } from '../config';
import { apiInstance, apiPostInstance } from './base';

export const getData = path =>
  useQuery(['data', path], () => apiInstance.get(path));

export const getMultiData = path => () => apiInstance.get(path);

export const getConfigPage = page =>
  useQuery(['configPages', page], () =>
    apiInstance.get(`/fetch/config_pages/${page}`)
  );

export const getNodeList = type =>
  useQuery(['nodeList', type], () =>
    apiInstance.get(`/fetch/node-list/${type}`)
  );

export const getTalentProfile = path =>
  useQuery(['talentProfile', path], () =>
    apiInstance.get(`/fetch/user?url=${path}`)
  );

export const getNodeData = path =>
  useQuery(['nodeData', path], () =>
    apiInstance.get(`/fetch/node?url=${path}`)
  );

export const getHirePopup = () =>
  useQuery(
    ['hirePopup'],
    () => apiInstance.get('/fetch/config_pages/hire_popup'),
    { select: data => data.data }
  );

export const getSearchByParameters = ({
  target_id,
  display_id,
  paragraph_id,
  params,
  enabled,
}) =>
  useQuery(
    ['searchParam', target_id, display_id, params],
    () =>
      apiInstance.get(`search/${target_id}/${display_id}/${paragraph_id}`, {
        params,
      }),
    { keepPreviousData: true, enabled }
  );

export const useToken = () =>
  useQuery('getToken', () => apiInstance.get(`/session/token`), {
    enabled: IS_PRODUCTION,
    onSuccess: data => {
      apiPostInstance.defaults.headers.common['X-CSRF-Token'] = data?.data;
    },
  });

export const useSubmitForm = (setSubmittedMessage, setIsSubmitting, action) => {
  const submitFormData = async data => {
    const { formData, token } = data;
    try {
      const response = await fetch(action ? action : '/webform_rest/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': token,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      // If you need to handle the response data, you can do so here.
      const responseData = await response.json();
      // Set the submittedMessage state to 'success' on successful submission
      setSubmittedMessage('success');
      return responseData; // You can return data if needed.
    } catch (error) {
      // Handle network errors and return an error message.
      // Set the submittedMessage state to 'error' on submission failure
      setSubmittedMessage('error');
      return 'Network error: Form submission failed, please reload the page and try again';
    } finally {
      setIsSubmitting(false);
    }
  };

  return useMutation(submitFormData, {
    // onSuccess and onError callbacks are optional
  });
};
