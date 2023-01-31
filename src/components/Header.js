// import { useState, useRef, useEffect } from 'react';

// import '../Header.css';
// import React from 'react'


// const Header = () => {
//   const images = [
//       {src:'https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'},
//       {src:'https://images.unsplash.com/photo-1501446529957-6226bd447c46?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1489&q=80'},
//       {src:'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80'},
//     ];
    
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const slideLength = images.length;

//     let slideInterval;
//     let intervalTime = 5000;

//   const nextImage = () => {
//     setCurrentSlide(currentSlide === slideLength -1 ? 0 : currentSlide + 1)
//   }

//   // useEffect(() => {
//   //   setCurrentSlide(0)
//   // })

//   useEffect(() => {
//     auto()
//   }, [currentSlide]);

//   const auto = () => {
//     slideInterval = setInterval(nextImage, intervalTime)
//   }


//   return (
//     <div className='slider'>

//       {images.map((slide, index) => {
//         return (
//           <div key={index} className={index === currentSlide ? "slide current" : "slide"}>
//             {index === currentSlide && (
//               <img src={slide.src} alt="hero" />
//             )}
//           </div>
//         )
//       })
//       }

//     </div>
//   )
// }

// export default Header