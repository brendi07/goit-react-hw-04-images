import { useState } from 'react';
import { SearchbarHeader, SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput } from './Searchbar.styled';

const Searchbar = ({onSubmit}) => {
  const [searchName, setSearchName] = useState('');

  const searchNameChange = event => {
    setSearchName( event.currentTarget.value.toLowerCase())
  }

   const  searchSubmit = event => {
    event.preventDefault();

    if (searchName.trim() === '') {
      alert('Fill search filed')
      return
    }

    onSubmit(searchName)
    setSearchName('')
  }
  
   return (
      <SearchbarHeader >
        <SearchForm onSubmit={searchSubmit}>
          <SearchFormButton type="submit" >
            <SearchFormButtonLabel >
              Search
            </SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={searchNameChange}
          />
        </SearchForm>
      </SearchbarHeader>
    ); 
}

export default Searchbar