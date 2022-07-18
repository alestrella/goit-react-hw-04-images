import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Label,
  SearchbarStyled,
  SearchForm,
  SearchButton,
} from './Searchbar.styled';
import { BsSearch } from 'react-icons/bs';

class Searchbar extends Component {
  static propsTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase().trim() });
  };

  handleQuerySubmit = e => {
    const { onSubmit } = this.props;
    e.preventDefault();

    onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <SearchbarStyled>
        <SearchForm onSubmit={this.handleQuerySubmit}>
          <SearchButton type="submit">
            <BsSearch />
          </SearchButton>

          <Label
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="query"
            onChange={this.handleChange}
            value={this.state.query}
          />
        </SearchForm>
      </SearchbarStyled>
    );
  }
}

export default Searchbar;
