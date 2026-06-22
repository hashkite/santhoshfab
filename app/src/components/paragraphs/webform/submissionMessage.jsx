
const SubmissionMessage = ({ status, message = 'Thank you for subscribing to our newsletter' }) => {
  const title =
    status === 'error'
      ? 'Form submission failed. Please reload the page and try again.'
      : message
  // const text = status === 'error' ? null : 'Back to <a href="/">homepage</a>'

  return (
    <>
      {title && (
        <h2
          className={status === 'error' ? 'text-error' : 'text-success'}
          dangerouslySetInnerHTML={{ __html: title }}
        />
      )}
      {/* {text && <p dangerouslySetInnerHTML={{ __html: text }} />} */}
    </>
  )
}

export default SubmissionMessage
