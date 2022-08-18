import React from 'react';
import PropTypes from 'prop-types';
import {ImageGalleryItem} from './ImageGalleryItem';
import css from './Gallery.module.css';

export function ImageGallery({ img, openModal }) {
  return (
    <ul className={css.gallery}>
      {img.map(({ id, webformatURL }) => (
        <ImageGalleryItem
          key={id}
          id={id}
          smallImg={webformatURL}
          openModal={openModal}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  openModal: PropTypes.func.isRequired,
  img: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};
