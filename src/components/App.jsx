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


    const handleSearch = searchText => {
        setPage(1);
        setImages([]);
        setSearchText(searchText);        
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

// class App extends Component {
//     state = {
//         searchText: '',
//         images: [],
//         page: 1,
//         isLoading: false,
//         error: null,
//         totalImages: null,
//         modal: {
//             isShowModal: false,
//             largeImageURL: '',
//         }
//     }

//     componentDidUpdate(prevProps, prevState) {
//         if (
//             prevState.searchText !== this.state.searchText ||
//             prevState.page !== this.state.page
//         ) {
//             this.setState({ isLoading: true });
//             fetch(`https://pixabay.com/api/?q=${this.state.searchText}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
//                 .then(response => response.json())
//                 .then(image => {
//                     if (!image.total) {
//                         return Notiflix.Notify.failure('Sorry, there are no images to your search. Please try again');
//                     }
//                     this.setState(prevState => ({
//                         images: [...prevState.images, ...image.hits],
//                         totalImages: image.total,
//                     }));
//                 })
//                 .catch(error => error)
//                 .finally(() => {
//                     this.setState({ isLoading: false });
//                 });
//         };
//     };
    
//     handleSearch = searchText => {
//         if (this.state.searchText === searchText) {
//             return Notiflix.Notify.failure('Sorry, but you looking this image. Please try another');
//         }
//         this.setState({ searchText: searchText.toLowerCase(), images: [], page: 1 })
//     };

//     searchLoadMore = () => {
//         this.setState(prevState => ({
//             page: prevState.page + 1,
//         }));
//     };
        
//     openModal = largeImageURL => {
//         this.setState({ modal: { largeImageURL, isShowModal: true } })
//     }

//     closeModal = () => {
//         this.setState({ modal: { largeImageURL: '', isShowModal: false } })
//     }
    

//     render() {
//         const { images, isLoading, modal, totalImages, page } = this.state;
//         console.log(images)
//         const totalPages = totalImages / 12;        
//         let loadMore = false;
//         if (images.length >= 1 &&
//             page <= Math.ceil (totalPages)) {
//             loadMore = true            
//         }

//         return (
//             <div >
//                 <Searchbar handleSearch={this.handleSearch} ></Searchbar>
//                 {isLoading && <Loader />}               
                                                
//                 {images.length > 0 &&  (                    
//                     <ImageGallery
//                         images={images}
//                         searchLoadMore={this.searchLoadMore}
//                         openModal={this.openModal}
//                     ></ImageGallery>
//                 )}

//                 {loadMore && (
//                 <Button
//                     searchLoadMore={this.searchLoadMore}> 
//                     Load More...
//                 </Button>
//                 )}

//                 {modal.isShowModal && (
//                     <Modal
//                         largeImageURL={modal.largeImageURL}
//                         closeModal={this.closeModal}
//                     />)}
//             </div>
//         );
//     };
// };
	

export default App

            
  