import React from 'react'
import './modal.scss'

const Modal = ({ data, className, transition, closeModal }) => {
  const { video } = data

  const handleKeyDown = event => {
    if (event.key === 'Enter' || event.key === ' ') {
      closeModal()
    }
  }

  return (
    <>
      <div className={`modal ${className}`} data-transition={transition}>
        <div className="modal__inner">
          {video && <video controls width="560" height="315" autoPlay>
            <source src={video} type="video/mp4" />
          </video>}
        </div>
      </div>
      <div
        onClick={closeModal}
        role="button"
        tabIndex="0"
        onKeyDown={handleKeyDown}
        className="modal__overlay"
      >
        <span className="visually-hidden">{'Close modal'}</span>
      </div>
      <div
        className="modal__close"
        onClick={closeModal}
        role="button"
        tabIndex="0"
        onKeyDown={handleKeyDown}
      />
    </>
  )
}

export default Modal
