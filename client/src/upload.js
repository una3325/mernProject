import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './css/Upload.css';

function Upload({ onImagesUploaded }) {
  const [images, setImages] = useState([]);

  const handleImageUpload = () => {
    onImagesUploaded(images);
  };

  const onDrop = (acceptedFiles) => {
    setImages([...images, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="upload">
      <header className="upload-header">
        <h1>Image Board</h1>
      </header>
      <main className="image-main">
        <div className="image-container-" {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some images here, or click to select images</p>
        </div>
        <div className="image-preview-container">
          {images.map((image, index) => (
            <img
              key={index}
              src={URL.createObjectURL(image)}
              alt="업로드 이미지"
              className="image-preview"
            />
          ))}
        </div>
        <button onClick={handleImageUpload}>Upload Images</button>
      </main>
    </div>
  );
}

export default Upload;
