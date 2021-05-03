import React, { useState } from 'react';
import SearchBar from './SearchBar';
import unslash from '../api/unslash';
import ImageList from './ImageList';
import Loader from './Loader';

const initialData = {
  images: [],
  total: 0,
  totalPage: 0,
  page: 0,
};

const App = () => {
  const [term, setTerm] = useState('');
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setData(initialData);
    loadPhotos();
  };

  const loadPhotos = async () => {
    if (!term) return false;
    setLoading(true);

    const response = await unslash.get('/search/photos', {
      params: { query: term, per_page: 20, page: data.page + 1 },
    });

    if (!response.data) {
      setLoading(false);
      return false;
    }

    setData((data) => ({
      images: data.images.concat(response.data.results),
      page: data.page + 1,
      total: response.data.total,
      totalPage: response.data.total_pages,
    }));
    setLoading(false);
  };

  return (
    <div className="ui container" style={{ paddingTop: '2rem' }}>
      <SearchBar term={term} setTerm={setTerm} onSubmit={handleSearch} />

      {loading && data.page === 0 ? (
        <Loader />
      ) : data.page === 1 && data.images.length === 0 ? (
        <div style={{ marginBottom: '1rem' }} className="ui red large label">
          NO Images Found!!
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '1rem' }} className="ui large label">
            Found: {data.total} images
          </div>
          <ImageList data={data} loadPhotos={loadPhotos} />
        </>
      )}
    </div>
  );
};

export default App;
