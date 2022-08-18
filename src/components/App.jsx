import { Component } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import SearchBar from "../components/SearchBar/SearchBar";
import ImageGallery from "../components/ImageGallery/ImageGallery"


export class App extends Component {
  state = {
    keyword: "",
    page: null,
    showModal: false,
  };
  handleFormSubmit = (keyword) => {
    this.setState({ keyword });
    this.setState({ page: 1 })

  };
  render() {
    return (
      <div className='App'>
        <SearchBar onSubmit={this.handleFormSubmit} />

        <ImageGallery request={this.state.keyword} startPage={this.state.page} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}