import React from 'react';
import { useParams } from 'react-router-dom';
import '../css/Detail.css';

function Detail({ images }) {
  const { id } = useParams();
  const photos = images.find((img) => img.id === id);

  if (!photos) {
    return (
      <div>
        <h3>존재하지 않는 페이지입니다.</h3>
      </div>
    );
  }

  const { title, detail, url } = photos;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src={url} alt={title} />
        </div>
        <div className="col-md-6">
          <h3 className="pt-5">{title}</h3>
          <p>{detail}</p>
          <button className="btn btn-danger">담기</button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
