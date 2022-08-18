import s from "./ImageGallery.module.css";
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'
import { Component } from "react";
import {InfinitySpin} from "react-loader-spinner";
import Modal from '../Modal/Modal'
import {fetchPictures} from '../Api/Api';
import Button from '../Button/Button'




export default class ImageGallery extends Component {
    state = {
        baseApi: 'https://pixabay.com/api/',
        APIkey: '22968833-cf9b798f42870513c2372fa03',
        page: 1,
        pictures: [],
        chosenPic: '',
        showModal: false,
        status: 'idle',
    };

    componentDidUpdate(prevProps, prevState) {
        const { baseApi, APIkey, } = this.state
        const prevPage = prevState.page;
        let nextPage = null;
        const prevInputValue = prevProps.request;
        const nextInputValue = this.props.request;
        if (prevInputValue !== nextInputValue) {
            nextPage = this.props.page
        } else { nextPage = this.state.page }


        if (prevInputValue !== nextInputValue || prevPage !== nextPage) {

            this.setState({ status: 'pending', })
            fetchPictures(nextInputValue, baseApi, APIkey, nextPage)

                .then((data) => {
                    if (prevInputValue === nextInputValue) { this.setState({ pictures: [...prevState.pictures, ...data], status: 'resolve' }) };
                    if (prevInputValue !== nextInputValue) {
                        this.setState({
                            pictures: []
                        })
                        this.setState({ pictures: [...data], status: 'resolve', })
                    };
                    window.scrollTo({
                        top: document.documentElement.scrollHeight,
                        behavior: 'smooth',
                    });
                })

                .catch(err => {
                    this.setState({ error: err, status: 'rejected' })
                })
        }


    }


    chosePic = e => {
        this.setState({
            chosenPic: e.target.dataset.source,
        });

    };

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal,
        });
    };


    onLoadMoreClick = () => {
        this.setState({
            page: this.state.page + 1,

        });
    };

    newSearch = () => {
        this.setState({
            page: 1
        });
    }


    render() {
        const { pictures, status, } = this.state

        if (status === 'idle') {
            return <div></div>;
        }
        if (status === 'pending') {

            return (
                <>
                    <ul className={s.ImageGallery}>
                        <ImageGalleryItem pictures={pictures} chosenPic={this.chosePic} toggleModal={this.toggleModal} />
                    </ul>
                    <InfinitySpin type="TailSpin" color="#00BFFF" height={80} width={80} /></>
            );
        }
        if (status === 'rejected') {
            return (
                <div>
                    <div className={s.rejection}>Sorry, no matches found</div>
                </div>
            )
        }

        if (status === 'resolve') {
            if (pictures.length === 0) {
                return (
                    <div>
                        <div className={s.rejection}>Sorry, no matches found</div>
                    </div>
                )
            }

            return (
                <>
                    <ul className={s.ImageGallery}>

                        <ImageGalleryItem pictures={pictures} chosenPic={this.chosePic} toggleModal={this.toggleModal} />
                    </ul>
                    {this.state.showModal && (
                        <Modal toggleModal={this.toggleModal}>
                            <img className="modalImage" src={this.state.chosenPic} alt="" />
                        </Modal>
                    )}
                    <Button onLoadMoreClick={this.onLoadMoreClick} />
                </>
            );
        }
    }
}

ImageGallery.propTypes = {
    request: PropTypes.string,
};