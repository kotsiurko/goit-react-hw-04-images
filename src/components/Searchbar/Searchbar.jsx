import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  SearchbarWrapper,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
import { useState } from 'react';

const Searchbar = ({ onSubmit }) => {
  const [searchInfo, setSearchInfo] = useState('');

  const handleSearchInfoChange = evt => {
    setSearchInfo(evt.currentTarget.value.toLowerCase());
  };

  const handleSearchInfoSubmit = evt => {
    evt.preventDefault();

    if (searchInfo.trim() === '') {
      toast.info('Enter your request...');
      return;
    }
    onSubmit(searchInfo);
    setSearchInfo('');
  };

  return (
    <SearchbarWrapper>
      <SearchForm onSubmit={handleSearchInfoSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          value={searchInfo}
          onChange={handleSearchInfoChange}
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarWrapper>
  );
};

export default Searchbar;

// class oldSearchbar extends Component {
//   state = {
//     searchInfo: '',
//   };

//   handleSearchInfoChange = evt => {
//     this.setState({ searchInfo: evt.currentTarget.value.toLowerCase() });
//   };

//   handleSearchInfoSubmit = evt => {
//     evt.preventDefault();

//     const { searchInfo } = this.state;

//     if (searchInfo.trim() === '') {
//       toast.info('Enter your request...');
//       return;
//     }
//     this.props.onSubmit(searchInfo);
//     this.setState({ searchInfo: '' });
//   };

//   render() {
//     return (
//       <SearchbarWrapper>
//         <SearchForm onSubmit={this.handleSearchInfoSubmit}>
//           <SearchFormButton type="submit">
//             <SearchFormButtonLabel>Search</SearchFormButtonLabel>
//           </SearchFormButton>

//           <SearchFormInput
//             value={this.state.searchInfo}
//             onChange={this.handleSearchInfoChange}
//             className="input"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//           />
//         </SearchForm>
//       </SearchbarWrapper>
//     );
//   }
// }
