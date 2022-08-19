import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyEsc);
  }

  handleKeyEsc = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  backdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={css.modal} onClick={this.backdropClick}>
        <div className={css.modal__block}>
          <img 
            src={this.props.largeImage}
            alt="" 
            className={css.modal__img}
          />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
};
