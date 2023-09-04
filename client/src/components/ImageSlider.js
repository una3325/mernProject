import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../css/Slider.css';

import {
  EffectCoverflow,
  Navigation,
  Pagination,
  Autoplay,
} from 'swiper/modules'; // Autoplay 모듈을 가져옵니다.EffectCoverflow,

export const ImageSlider = ({ images }) => {
  return (
    <div className="container">
      <div className="heading">
        <h3>#Gangneung Photos</h3>
      </div>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'3'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 60,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]} // Autoplay 모듈을 추가합니다.//EffectCoverflow,
        className="swiper_container"
        autoplay={{ delay: 3000, disableOnInteraction: false }} // 사진이 3초마다 자동으로 넘어가도록 설정합니다. (3000밀리초 = 3초)
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image.url} alt={image.alt} />
          </SwiperSlide>
        ))}

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  );
};

export default ImageSlider;
