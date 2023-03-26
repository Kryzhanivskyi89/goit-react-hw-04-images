import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

import style from '../styles.module.css';

const ImageGallery = ({images, openModal, }) => {   
    
    return (
        <ul className={style.ImageGallery}>
            {images.map(({id, webformatURL, largeImageURL, tags}) => (
                <ImageGalleryItem
                    key={id}
                    webformatURL={webformatURL}                    
                    openModal={() => openModal(largeImageURL, tags)}
                    tag={tags}
                />
            ))}
        </ul>         
    ) 
}

export default ImageGallery

ImageGallery.propTypes = {
    images: PropTypes.array.isRequired,    
    openModal: PropTypes.func.isRequired,
}

 
