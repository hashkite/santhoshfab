import React from 'react'

const FieldMarkup = ({ markup }) => {
  return (
    <div
      className="field field-markup"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  )
}

export default FieldMarkup
