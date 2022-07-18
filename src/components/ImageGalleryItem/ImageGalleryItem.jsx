import PropTypes from 'prop-types';
import { GalleryItem, Image } from './ImageGalleryItem.styled.js';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags, onClick }) => {
  return (
    <GalleryItem onClick={() => onClick(largeImageURL)}>
      <Image src={webformatURL} alt={tags} />
    </GalleryItem>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propsTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
