import React from 'react';
import ImageData from '../utils/data';
import Photos from '../utils/Photos';
import '../css/Home.css';

function Home() {
  return (
    <div>
      <p className="Introduction">
        Welcome to the wallpaper sharing site.
        <br />
        You can use it after registering and logging in.
        <br />
      </p>
      <div className="app-container">
        <ImageData />
        <Photos />
      </div>
    </div>
  );
}

export default Home;
