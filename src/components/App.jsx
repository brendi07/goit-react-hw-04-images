import { useState, useEffect } from "react";


import  {getSearchedImages} from "./api/api"

import  Searchbar  from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";

const App = () => {
  const [searchName, setSearchName] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMoreImages, setHasMoreImages] = useState(false);

  const changeSearchName = (newsearchName) => {
    setSearchName(newsearchName);
    setImages([]);
    setPage(1);
  };


  useEffect(() => {
    const handleImages = async (searchName, page) => {
      try {
        setLoading(true);
        const data = await getSearchedImages(searchName, page);

        setImages(prev => [...prev, ...data.hits]);
        setError('');
        setHasMoreImages(page < Math.ceil(data.totalHits / 12));
      } catch (error) {
        setError(error.response.data);
      } finally {
        setLoading(false);
      }
    };
    if (searchName) { handleImages(searchName, page); }
 }, [searchName, page]);


 
  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div>
      <Searchbar onSubmit={changeSearchName} />

      {error && <h1>{error}</h1>}
      {loading && <Loader />}
      {images.length > 0 && <ImageGallery images={images} />}
      {hasMoreImages && <Button buttonClick={loadMore} />}
    </div>
  );
}


// class App extends Component {
//   state = {
//     searchName: '',
//     images: [],
//     loading: false,
//     error: '',
//     page: 1,
//     hasMoreImages: false,
//   };

//   changeSearchName = searchName => {
//     this.setState({
//       searchName: searchName,
//       images: [],
//       page: 1,
//     });
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { searchName, page} = this.state;

//     if (
//       searchName !== prevState.searchName ||
//       page !== prevState.page
//     ) {
//       this.handleImages(searchName, page);
//     }
//   }

//   handleImages = async (searchName, page) => {
//     try {
//       this.setState({ loading: true });
//       const data = await getSearchedImages(searchName, page);

//       this.setState(prevState => ({
//         images: [...prevState.images, ...data.hits],
//         error: '',
//         hasMoreImages: this.state.page < Math.ceil(data.totalHits / 12),
//       }));
//     } catch (error) {
//       this.setState({ error: error.response.data });
//     } finally {
//       this.setState({ loading: false });
//     }
//   };

//   loadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   render() {
//     const { images, loading, error, hasMoreImages } = this.state;
//     return (
//       <div>
//         <Searchbar onSubmit={this.changeSearchName} />

//         {error && <h1>{error}</h1>}
//         {loading && <Loader />}
//         {images.length > 0 && <ImageGallery images={images} />}
//         {hasMoreImages && <Button buttonClick={this.loadMore} />}
//       </div>
//     );
//   }
// }

export default App

