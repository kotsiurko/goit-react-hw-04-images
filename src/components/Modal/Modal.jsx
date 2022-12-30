import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, Modal, ImageComp } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const ModalWindow = ({ src, alt, onClose }) => {
  useEffect(() => {
    const onCloseModalEsc = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onCloseModalEsc);
    return () => window.removeEventListener('keydown', onCloseModalEsc);
  }, [onClose]);

  const onBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <Backdrop onClick={onBackdropClick}>
      <Modal>
        <ImageComp src={src} alt={alt} />
      </Modal>
    </Backdrop>,
    modalRoot
  );
};
export default ModalWindow;
