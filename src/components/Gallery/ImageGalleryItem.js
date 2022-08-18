import React from 'react';
import PropTypes from 'prop-types';
import css from './Gallery.module.css';

export function ImageGalleryItem({ smallImg, id, openModal }) {
  return (
    <li className={css.gallery__item} onClick={() => openModal(id)}>
      <img className={css.gallery__image} src={smallImg} alt="" />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  openModal: PropTypes.func.isRequired,
};
