import { forwardRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useKeyPress } from '../../hooks/useKeyPress';
import FadeInOut from '../fade-in-out';
import './style.scss';

const Modal = forwardRef(
  (
    {
      children,
      closeModal,
      isOpen,
      closeVisible = true,
      duration = 300,
      portalRef = document.body,
      type = 'default',
      onAnimationEnd,
    },
    ref
  ) => {
    const onContentClick = e => e.stopPropagation();

    useKeyPress('Escape', closeModal);

    useEffect(() => {
      document.body.style.overflowY = isOpen ? 'hidden' : 'auto';
      return () => {
        document.body.style.overflowY = 'auto';
      };
    }, [isOpen]);

    return createPortal(
      <FadeInOut
        onAnimationEnd={onAnimationEnd}
        onClick={closeModal}
        className={`custom-modal ${type}`}
        show={isOpen}
        duration={duration}
      >
        <div
          ref={ref}
          className={'modal__content container-plus'}
          onClick={onContentClick}
          role="presentation"
        >
          <div className={'modal__body'}>{children}</div>
          {closeVisible && (
            <button className="modal__close" onClick={closeModal}></button>
          )}
        </div>
      </FadeInOut>,
      portalRef
    );
  }
);

export default Modal;
