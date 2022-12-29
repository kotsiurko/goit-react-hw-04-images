import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, Modal, ImageComp } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const ModalWindow = ({ src, alt, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', onCloseModalEsc);
    return () => window.removeEventListener('keydown', onCloseModalEsc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCloseModalEsc = event => {
    if (event.code === 'Escape' || event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <Backdrop onClick={onCloseModalEsc}>
      <Modal>
        <ImageComp src={src} alt={alt} />
      </Modal>
    </Backdrop>,
    modalRoot
  );
};
export default ModalWindow;
