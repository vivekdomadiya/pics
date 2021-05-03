import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import Loader from './Loader';
import ImageCard from './ImageCard';
import './ImageList.css';

const ImageList = (props) => {
  const [images, setImages] = useState([]);
  const [column, setColumn] = useState(0);

  const { images: imageList, page, totalPage } = props.data;

  const splitImageList = (imageList, n) => {
    const images = [];
    for (let i = 0; i < n; i++) {
      images.push(imageList.filter((e, j) => j % n === i));
    }
    return images;
  };

  useEffect(() => {
    setImages(splitImageList(imageList, column));
  }, [imageList, column]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setColumns();
    });
    setColumns();
  });

  const setColumns = () => {
    const width = window.innerWidth;
    var c = 0;
    if (width >= 992) c = 3;
    else if (width >= 768) c = 2;
    else c = 1;

    if (c !== column) setColumn(c);
  };

  const renderImages = (imageArr, id) => {
    return (
      <div key={id}>
        {imageArr.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
    );
  };

  return (
    <InfiniteScroll
      dataLength={imageList.length}
      next={props.loadPhotos}
      hasMore={page < totalPage}
      loader={<Loader />}
    >
      <div className="image-list" style={{ '--columns': `${column}` }}>
        {images.map((imageArr, id) => renderImages(imageArr, id))}
      </div>
    </InfiniteScroll>
  );
};

export default ImageList;
