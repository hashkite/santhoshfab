import React from 'react';

import Webform from '../../paragraphs/webform';

import './formSubscribe.scss';

const FormSubscribe = ({ type }) => {
  const data = {
    fields: [
      {
        name: 'email',
        placeholder: 'Address Email',
        required: true,
        type: 'email'
      },
      {
        class: 'form-actions',
        name: 'actions',
        required: false,
        title: 'Subscribe',
        type: 'webform_actions_subscribe'
      }
    ],
    newsletter_id: 'default',
    action: '/simplenews/subscribe'
  }

  return (
    <div className={`form-subscribe__webform${type ? ' --type-'+type : ''}`}>
      <Webform 
        data={data}
      />
    </div>
  )
}

export default FormSubscribe