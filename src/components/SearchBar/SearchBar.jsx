import PropTypes from 'prop-types';
import { Component } from "react";
import s from "./SearchBar.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class SearchBar extends Component {
  state = {
    keyword: "",

  };
  handleKeywordChange = (event) => {
    this.setState({ keyword: event.currentTarget.value.toLowerCase() });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.keyword.trim() === "") {
      toast.error("Enter something!");

      return;
    }
    this.props.onSubmit(this.state.keyword);
    this.setState({ keyword: "" });
  };



  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>
          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.keyword}
            onChange={this.handleKeywordChange}
          />
        </form>
      </header>
    );
  }
}
SearchBar.propTypes = {
  onSubmit: PropTypes.func,
}