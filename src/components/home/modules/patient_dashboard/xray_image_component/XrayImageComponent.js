import React from "react";

const ImageComponent = (props) => {
  const { ImageMimeType, ImageUrl } = props;
  const imageJPEG = "image/jpeg";
  const jpegimagedatabaseurl = "data:image/jpeg;base64,/9j/";
  const pngimagedatabaseurl = "data:image/png;base64,";

  return (
    <img
      src={
        ImageMimeType === imageJPEG
          ? jpegimagedatabaseurl + ImageUrl
          : pngimagedatabaseurl + ImageUrl
      }
      style={{
        width: "100%",
        height: "269px",
        borderRadius: "5px",
      }}
      alt=""
    />
  );
};

export default ImageComponent;
