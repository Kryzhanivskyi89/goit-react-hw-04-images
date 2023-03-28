import { useEffect, useState } from 'react'
import Notiflix from 'notiflix';
import Searchbar from './Searchbar/Searchbar'
import ImageGallery from './ImageGallery/ImageGallery'
import Modal from './Modal/Modal'
import Loader from './Loader/Loader'
import Button from './Button/Button';

const API_KEY = '33210301-3be20b33fb7f66869d8b0904e';

const App = () => {
    const [searchText, setSearchText] = useState ('')
    const [images, setImages] = useState([])
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)    
    const [totalImages, setTotalImages] = useState(null)
    const [modal, setModal] = useState({
        isShowModal: false,
        largeImageURL: '',
    });    

    useEffect(() => {
        if (page === 0) return; 
        searchText && fetchImages();
        searchText && setIsLoading(true);

        function fetchImages() {
            fetch(`https://pixabay.com/api/?q=${searchText}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
                .then(response => response.json())
                .then(image => {
                    if (!image.total) {
                        return Notiflix.Notify.failure('Sorry, there are no images to your search. Please try again');
                    }                    
                    setImages(prevState => [...prevState, ...image.hits]);                                        
                    setTotalImages(prevState => image.total);                    
                })
                .catch(error => error)
                .finally(() => {
                    setIsLoading(false) ;
                });
        }
    }, [page, searchText]);


    const handleSearch = text => {
        console.log(text)
        console.log(searchText)
         
        if (text !== searchText) {
        console.log('Умова виконується')
        setPage(1);
        setImages([]);
        setSearchText(searchText);       
        };               
    };

    const searchLoadMore = () => {
        setPage(prev => prev + 1)
    };
        
    const openModal = largeImageURL => {
        setModal({ largeImageURL, isShowModal: true })
    };

    const closeModal = () => {
        setModal({ largeImageURL: '', isShowModal: false })
    };
           
    const totalPages = totalImages / 12;     
        let loadMore = false;
        if (images.length >= 1 &&
            page <= Math.ceil (totalPages)) {
            loadMore = true            
        }
    
    return (
        <div >
            <Searchbar handleSearch={handleSearch} ></Searchbar>
            {isLoading && <Loader />}               
                                                
            {images.length > 0 &&  (                    
                <ImageGallery
                    images={images}
                    searchLoadMore={searchLoadMore}
                    openModal={openModal}
                ></ImageGallery>
            )}

            {loadMore && (
            <Button
                searchLoadMore={searchLoadMore}> 
                Load More...
            </Button>
            )}

            {modal.isShowModal && (
                <Modal
                    largeImageURL={modal.largeImageURL}
                    closeModal={closeModal}
                />)}
        </div>
    );
};

	

export default App

            
  