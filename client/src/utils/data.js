import ImageSlider from '../components/ImageSlider';
import '../css/data.css';

function ImageData() {
  const images = [
    {
      label: 'Image 1',
      alt: '이미지 1',
      url: `${process.env.PUBLIC_URL}/img/1.jpg`,
    },
    {
      label: 'Image 2',
      alt: '이미지 2',
      url: `${process.env.PUBLIC_URL}/img/2.jpg`,
    },
    {
      label: 'Image 3',
      alt: '이미지 3',
      url: `${process.env.PUBLIC_URL}/img/3.jpg`,
    },
    {
      label: 'Image 4',
      alt: '이미지 4',
      url: `${process.env.PUBLIC_URL}/img/4.jpg`,
    },
    {
      label: 'Image 5',
      alt: '이미지 5',
      url: `${process.env.PUBLIC_URL}/img/5.jpg`,
    },
    {
      label: 'Image 6',
      alt: '이미지 6',
      url: `${process.env.PUBLIC_URL}/img/6.jpg`,
    },
  ];

  return (
    <div>
      <ImageSlider images={images} />
    </div>
  );
}

export default ImageData;
