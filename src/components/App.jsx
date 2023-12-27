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

export default App

