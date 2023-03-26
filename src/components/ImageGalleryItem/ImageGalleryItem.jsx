import PropTypes from 'prop-types';
import style from '../styles.module.css';

const ImageGalleryItem = ({ webformatURL,  openModal, tag }) => {
    return (
        <li onClick={openModal}
            className={style.ImageGalleryItem}>                
                <img
                    src={webformatURL}
                    alt={tag}
                    className={style.ImageGalleryItemImage}                    
                />
        </li>
    );    
}


  

export default ImageGalleryItem


ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired,
};
