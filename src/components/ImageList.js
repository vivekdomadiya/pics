import React from "react";
import ImageCard from "./ImageCard";
import "./ImageList.css";

function ImageList(props) {
  const images = props.images.map((image) => (
    <ImageCard key={image.id} image={image} />
  ));
  return <div className="image-list">{images}</div>;
}

export default ImageList;
