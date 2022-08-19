import React, { Component } from 'react';
import css from './App.module.css';
import {SearchBar} from './SearchBar/SearchBar';
import {ImageGallery} from './Gallery/ImageGallery';
import imagesApi from '../services/API';
import {Button} from './Button/Button';
import {Modal} from './Modal/Modal';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    img: [],
    searchQuery: '',
    largeImageURL: '',
    currentPage: 1,
    total: 0,
    showModal: false,
    loading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.fetchImages();
    }
  }

  handleSubmit = query => {
    this.setState({
      img: [],
      searchQuery: query,
      largeImageURL: '',
      currentPage: 1,
      total: 0,
      showModal: false,
      loading: true,
      error: null,
    });
  };

  fetchImages = () => {
    const { currentPage, searchQuery } = this.state;
    const options = { currentPage, searchQuery };

    

    imagesApi(options)
      .then(({ hits, totalHits }) => {

        if(hits.length === 0 ){Notify.warning('Sorry, nothing was found :)')}

        const newImages = hits.map(({ id, webformatURL, largeImageURL }) => {
          return { id, webformatURL, largeImageURL };
        });

        this.setState(prevState => ({
          img: [...prevState.img, ...newImages],
          total: totalHits,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(this.setState({ loading: false }));
  };

  loadMore = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  openModal = searchId => {
    const image = this.state.img.find(image => image.id === searchId);
    this.setState({ largeImageURL: image.largeImageURL });
    this.toggleModal();
  };

  render() {
    const { img, loading, showModal, error, largeImageURL } = this.state;
    return (
      <div className={css.App}>
        {error && Notify.failure('Sorry, there is some error')}
        <SearchBar onSubmit={this.handleSubmit} />
        {img.length > 0 && (
          <ImageGallery img={img} openModal={this.openModal} />
        )}
        {loading && <Loader/>}
        {img.length > 0 &&
          !loading && 
          img.length !== this.state.total && (
            <Button onClick={this.loadMore} />
          )}
        {showModal && (
          <Modal onClose={this.toggleModal} largeImage={largeImageURL} />
        )}
      </div>
    );
  }
}

export default App;
