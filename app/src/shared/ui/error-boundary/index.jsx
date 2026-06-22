import React from 'react'
import './style.scss'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { error: error }
  }

  componentDidCatch(error, errorInfo) {
    console.log(`/// ErrorBoundary START ///`)
    console.error(error, errorInfo)
    console.log(this.props.errorComponent)
    console.log(`/// ErrorBoundary END ///`)
  }

  render() {
    if (this.state.error) {
      if (this.props.errorComponent) {
        return this.props.errorComponent
      }

      return (
        <div
          className={'error-boundary margin-auto container text-center p-xxl'}
        >
          <h4 className={'text-error'}>There seems to be a problem.</h4>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
