import React, { useState } from 'react';
import Upload from '../upload';

function UploadImages() {
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleImagesUploaded = (images) => {
    // 업로드된 이미지 배열을 컴포넌트 상태로 업데이트
    setUploadedImages(images);
  };

  return (
    <div>
      <Upload onImagesUploaded={handleImagesUploaded} />
      <div className="uploaded-images-container">
        {uploadedImages.map((image, index) => (
          <img
            key={index}
            src={URL.createObjectURL(image)}
            alt="이미지 업로드"
            className="uploaded-image"
          />
        ))}
      </div>
    </div>
  );
}

export default UploadImages;
