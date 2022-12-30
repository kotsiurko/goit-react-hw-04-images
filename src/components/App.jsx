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
  // const [isBtnMoreShown, setBtnMoreShown] = useState(false);
  const [totalImages, setTotalImages] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState();

  useEffect(() => {
    if (!requestInfo) return;

    const renderImages = async () => {
      try {
        setStatus('pending');
        const response = await fetchImages(requestInfo, page);

        if (response.hits.length === 0) {
          toast.info(
            'Sorry, but there are no results for your request. Please, try again with another request'
          );
          setStatus('resolved');
          return;
        }

        const normalizedData = normalizedImages(response.hits);

        setImages(prev => [...prev, ...normalizedData]);
        setStatus('resolved');
        setTotalImages(response.totalHits);
      } catch (error) {
        setError(error);
        setStatus('rejected');
      }
    };

    renderImages();
  }, [requestInfo, page]);

  useEffect(() => {
    status === 'rejected' && toast.warn('Something went wrong. Try again!');
  }, [status]);

  const handleFormSearch = newRequest => {
    setRequestInfo(newRequest);
    setPage(1);
    setImages([]);
  };

  const onBtnMoreClick = () => {
    setPage(prev => prev + 1);
  };

  const showBtn = totalImages !== images.length && status === 'resolved';

  return (
    <AppStyled>
      <Searchbar onSubmit={handleFormSearch} />

      {images.length > 0 && <ImageGallery images={images} />}

      {showBtn && <Button onBtnMoreClick={onBtnMoreClick} />}

      {status === 'pending' && <Loader />}

      <ToastContainer position="top-right" />
    </AppStyled>
  );
};

export default App;
