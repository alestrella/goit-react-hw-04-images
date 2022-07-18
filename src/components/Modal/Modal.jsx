import { Component } from 'react';
import PropTypes from 'prop-types';
import { ModalBox, Overlay } from './Modal.styled';

class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    imageURL: PropTypes.string.isRequired,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.onEscapePress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEscapePress);
  }

  onEscapePress = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <Overlay onClick={this.onBackdropClick}>
        <ModalBox>
          <img src={this.props.imageURL} alt="Full version" />
        </ModalBox>
      </Overlay>
    );
  }
}
export default Modal;
