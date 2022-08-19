import React, { Component } from 'react';
import style from './App.css';
import Searchbar from './components/Searchbar';
import newApi from './components/services';
import ImageGallery from './components/ImageGallery';
import Button from './components/UI/Button';
import Spynner from './components/UI/Spynner';
import Modal from './components/Modal';

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
    showModal: false,
    largeImage: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
    if (prevState.currentPage !== this.state.currentPage) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  onChangeQuery = query => {
    this.setState({
      images: [],
      currentPage: 1,
      searchQuery: query,
      error: null,
    });
  };

  fetchImages = () => {
    const { currentPage, searchQuery } = this.state;
    const options = {
      searchQuery,
      currentPage,
    };
    this.setState({
      isLoading: true,
    });
    newApi
      .fetchImages(options)
      .then(response => {
        this.setState(prevState => ({
          images: [...prevState.images, ...response],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => this.setState({ error: error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  openModal = imageForModal => {
    console.log('Open Modal', imageForModal);
    this.setState(() => ({ largeImage: imageForModal }));
    this.toggleModal();
  };
  closeModal = () => {
    this.setState({ largeImage: '' });
    this.toggleModal();
  };

  render() {
    const { images, isLoading, error, showModal, largeImage } = this.state;
    const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;
    console.log('Это рендер Арр', largeImage.largeImageURL);

    return (
      <div className={style.App}>
        {error && <h1>Ошибка!!!</h1>}
        <Searchbar onSubmit={this.onChangeQuery} />
        <ImageGallery images={images} onClickImage={this.openModal} />

        {shouldRenderLoadMoreButton && (
          <Button fetchImages={this.fetchImages}>load more</Button>
        )}
        {isLoading && <Spynner />}
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            bigImage={largeImage.largeImageURL}
          />
        )}
      </div>
    );
  }
}

export default App;