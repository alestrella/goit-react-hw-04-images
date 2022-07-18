import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Label,
  SearchbarStyled,
  SearchForm,
  SearchButton,
} from './Searchbar.styled';
import { BsSearch } from 'react-icons/bs';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.target.value.toLowerCase().trim());
  };

  const handleQuerySubmit = e => {
    e.preventDefault();
    onSubmit(query);
    setQuery('');
  };

  return (
    <SearchbarStyled>
      <SearchForm onSubmit={handleQuerySubmit}>
        <SearchButton type="submit">
          <BsSearch />
        </SearchButton>

        <Label
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
          onChange={handleChange}
          value={query}
        />
      </SearchForm>
    </SearchbarStyled>
  );
};

export default Searchbar;

SearchButton.propsTypes = {
  onSubmit: PropTypes.func.isRequired,
};
