import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { BsXSquare } from 'react-icons/bs';
import { ModalBox, Overlay, CloseButton } from './Modal.styled';

const Modal = ({ onClose, imageURL }) => {
  useEffect(() => {
    const onEscapePress = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', onEscapePress);

    return () => {
      document.removeEventListener('keydown', onEscapePress);
    };
  }, [onClose]);

  const onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={onBackdropClick}>
      <ModalBox>
        <CloseButton type="button" onClick={onClose} aria-label="Close">
          <BsXSquare />
        </CloseButton>
        <img src={imageURL} alt="Full version" />
      </ModalBox>
    </Overlay>
  );
};
export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  imageURL: PropTypes.string.isRequired,
};
