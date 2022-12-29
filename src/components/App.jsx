// import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchImages, normalizedImages } from '../services/pixabay-api';
import ImageGallery from './ImageGallery/ImageGallery';

import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import Loader from './Loader/Loader';

import { AppStyled } from './App.styled';
import { useState, useEffect } from 'react';

const App = () => {
  const [status, setStatus] = useState('idle');
  const [requestInfo, setRequestInfo] = useState('');
  const [page, setPage] = useState(null);
  const [images, setImages] = useState([]);
  const [isBtnMoreShown, setBtnMoreShown] = useState(false);
  const [perPage] = useState(12);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState();

  useEffect(() => {
    if (!requestInfo) return;
    setStatus('pending');
    renderImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestInfo, page]);

  const handleFormSearch = newRequest => {
    setRequestInfo(newRequest);
    setPage(1);
    setImages([]);
  };

  const onBtnMoreClick = () => {
    setPage(prev => prev + 1);
  };

  const renderImages = async () => {
    try {
      const response = await fetchImages(requestInfo, page, perPage);

      if (response.hits.length === 0) {
        toast.info(
          'Sorry, but there are no results for your request. Please, try again with another request'
        );
        setStatus('resolved');
        setBtnMoreShown(false);
        return;
      }

      const normalizedData = normalizedImages(response.hits);

      setImages(prev => [...prev, ...normalizedData]);
      setStatus('resolved');
      setBtnMoreShown(() => page < Math.ceil(response.totalHits / perPage));
    } catch (error) {
      setError(error);
      setStatus('rejected');
    }
  };

  return (
    <AppStyled>
      <Searchbar onSubmit={handleFormSearch} />

      {images.length > 0 && <ImageGallery images={images} />}

      {isBtnMoreShown && status === 'resolved' && (
        <Button onBtnMoreClick={onBtnMoreClick} />
      )}

      {status === 'pending' && <Loader />}

      {status === 'rejected' && toast.warn('Something went wrong. Try again!')}

      <ToastContainer position="top-right" />
    </AppStyled>
  );
};

export default App;

// ===========================================================
// class oldApp extends Component {
//   state = {
//     status: 'idle',
//     requestInfo: '',
//     page: null,
//     images: [],
//     isBtnMoreShown: false,
//     perPage: 12,
//   };

//   componentDidUpdate(_, prevState) {
//     const { requestInfo, page } = this.state;
//     if (requestInfo !== prevState.requestInfo || page !== prevState.page) {
//       this.setState({ status: 'pending' });
//       this.renderImages();
//     }
//   }

//   handleFormSearch = newRequest => {
//     this.setState({ requestInfo: newRequest, page: 1, images: [] });
//   };

//   onBtnMoreClick = () => {
//     this.setState(previousState => ({
//       page: previousState.page + 1,
//     }));
//   };

//   renderImages = async () => {
//     const { requestInfo, page, perPage } = this.state;
//     try {
//       const response = await fetchImages(requestInfo, page, perPage);

//       if (response.hits.length === 0) {
//         toast.info(
//           'Sorry, but there are no results for your request. Please, try again with another request'
//         );
//         this.setState({ status: 'resolved', isBtnMoreShown: false });
//         return;
//       }

//       const normalizedData = normalizedImages(response.hits);

//       this.setState(prevState => ({
//         images: [...prevState.images, ...normalizedData],
//         status: 'resolved',
//         isBtnMoreShown: page < Math.ceil(response.totalHits / perPage),
//       }));
//     } catch (error) {
//       this.setState({ error, status: 'rejected' });
//     }
//   };

//   render() {
//     const { images, isBtnMoreShown, status } = this.state;
//     return (
//       <AppStyled>
//         <Searchbar onSubmit={this.handleFormSearch} />

//         {images.length > 0 && <ImageGallery images={images} />}

//         {isBtnMoreShown && status === 'resolved' && (
//           <Button onBtnMoreClick={this.onBtnMoreClick} />
//         )}

//         {status === 'pending' && <Loader />}

//         {status === 'rejected' &&
//           toast.warn('Something went wrong. Try again!')}

//         <ToastContainer position="top-right" />
//       </AppStyled>
//     );
//   }
// }
// export default oldApp;
