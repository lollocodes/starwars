import { useState, useRef, useEffect } from 'react';
// import img0 from "../slideImages/img0.jpg"
import img1 from "../slideImages/img1.jpg"
import img2 from "../slideImages/img2.jpg"
import img3 from "../slideImages/img3.jpg"
import '../Header.css';
import React from 'react'


const Header = () => {
    const images = [img1, img2, img3];
    const [currentSlide, setCurrentSlide] = useState(0);

    let sliderInterval = useRef();
    let changeImages = () => {
      if (currentSlide < images.lenght - 1) {
        setCurrentSlide(currentSlide + 1);
      } else {
        setCurrentSlide(0);
      }
    };

  useEffect(() => {
      sliderInterval = setInterval(() => {
        changeImages();
      }, 5000);
      return () => {
        clearInterval(sliderInterval);
      };
  }, []);


  return (
    <div className='img-Wrapper'>
      {images.map((img, index) => {
        return (
          <img key={index} src={img} className={
              index === currentSlide ? "imageActive homeImage" : "image"
            }
          />
        );
      })}

    </div>
  )
}

export default Header