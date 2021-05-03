import React from "react";

const ImageCard = ({ image: { alt_description, urls } }) => {
  return (
    <div className="image-card">
      <img alt={alt_description} src={urls.regular} />
    </div>
  );
};

export default ImageCard;
