import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { ReactComponent as SearchIcon } from './search.svg';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class SearchBar extends Component {
  state = { searchQuery: '' };

  handleChange = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    const query = this.state.searchQuery.trim();

    if (query.trim() === '') {
      return Notify.warning('Please, enter a query!');
    }

    this.props.onSubmit(query);
    
  };

  render() {
    return (
      <header className={css.searchBar}>
        <form className={css.searchBar__form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchBar__button}>
            <SearchIcon width="30" height="30" />
            <span className={css.searchBar__label}>Search</span>
          </button>
          <input
            className={css.searchBar__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images..."
            value={this.state.searchQuery}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

