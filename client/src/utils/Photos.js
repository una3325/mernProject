import '../css/Photos.css';
import { Link } from 'react-router-dom';
import React from 'react';

const images = [
  {
    label: 'Image 7',
    alt: '이미지 7',
    url: `${process.env.PUBLIC_URL}/img/7.jpg`,
    id: '7',
  },
  {
    label: 'Image 8',
    alt: '이미지 8',
    url: `${process.env.PUBLIC_URL}/img/8.jpg`,
    id: '8',
  },
  {
    label: 'Image 9',
    alt: '이미지 9',
    url: `${process.env.PUBLIC_URL}/img/9.jpg`,
    id: '9',
  },
  {
    label: 'Image 10',
    alt: '이미지 10',
    url: `${process.env.PUBLIC_URL}/img/10.jpg`,
    id: '10',
  },
  {
    label: 'Image 11',
    alt: '이미지 11',
    url: `${process.env.PUBLIC_URL}/img/11.jpg`,
    id: '11',
  },
  {
    label: 'Image 12',
    alt: '이미지 12',
    url: `${process.env.PUBLIC_URL}/img/12.jpg`,
    id: '12',
  },
  {
    label: 'Image 13',
    alt: '이미지 13',
    url: `${process.env.PUBLIC_URL}/img/13.jpg`,
    id: '13',
  },
  {
    label: 'Image 14',
    alt: '이미지 14',
    url: `${process.env.PUBLIC_URL}/img/14.jpg`,
    id: '14',
  },
  {
    label: 'Image 15',
    alt: '이미지 15',
    url: `${process.env.PUBLIC_URL}/img/15.jpg`,
    id: '15',
  },
  {
    label: 'Image 16',
    alt: '이미지 16',
    url: `${process.env.PUBLIC_URL}/img/16.jpg`,
    id: '16',
  },
  {
    label: 'Image 17',
    alt: '이미지 17',
    url: `${process.env.PUBLIC_URL}/img/17.jpg`,
    id: '17',
  },
  {
    label: 'Image 18',
    alt: '이미지 18',
    url: `${process.env.PUBLIC_URL}/img/18.jpg`,
    id: '18',
  },
  {
    label: 'Image 19',
    alt: '이미지 19',
    url: `${process.env.PUBLIC_URL}/img/19.jpg`,
    id: '19',
  },
  {
    label: 'Image 20',
    alt: '이미지 20',
    url: `${process.env.PUBLIC_URL}/img/20.jpg`,
    id: '20',
  },
  {
    label: 'Image 21',
    alt: '이미지 21',
    url: `${process.env.PUBLIC_URL}/img/21.jpg`,
    id: '21',
  },
  {
    label: 'Image 22',
    alt: '이미지 22',
    url: `${process.env.PUBLIC_URL}/img/22.jpg`,
    id: '22',
  },
  {
    label: 'Image 23',
    alt: '이미지 23',
    url: `${process.env.PUBLIC_URL}/img/23.jpg`,
    id: '23',
  },
  {
    label: 'Image 24',
    alt: '이미지 24',
    url: `${process.env.PUBLIC_URL}/img/24.jpg`,
    id: '24',
  },
  {
    label: 'Image 25',
    alt: '이미지 25',
    url: `${process.env.PUBLIC_URL}/img/25.jpg`,
    id: '25',
  },
  {
    label: 'Image 26',
    alt: '이미지 26',
    url: `${process.env.PUBLIC_URL}/img/26.jpg`,
    id: '26',
  },
  {
    label: 'Image 27',
    alt: '이미지 27',
    url: `${process.env.PUBLIC_URL}/img/27.jpg`,
    id: '27',
  },
  {
    label: 'Image 28',
    alt: '이미지 28',
    url: `${process.env.PUBLIC_URL}/img/28.jpg`,
    id: '28',
  },
  {
    label: 'Image 29',
    alt: '이미지 29',
    url: `${process.env.PUBLIC_URL}/img/29.jpg`,
    id: '29',
  },
  {
    label: 'Image 30',
    alt: '이미지 30',
    url: `${process.env.PUBLIC_URL}/img/30.jpg`,
    id: '30',
  },
];

function Photos() {
  return (
    <div className="image-container">
      {images.map((image) => (
        <div key={image.id}>
          <Link to={`/detail/${image.id}`}>
            <img src={image.url} alt={image.alt} />
          </Link>
          <div className="image-label">{image.label}</div>
        </div>
      ))}
    </div>
  );
}

export default Photos;
