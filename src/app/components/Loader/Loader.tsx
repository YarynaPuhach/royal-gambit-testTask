import React, { useEffect } from 'react';
import gsap from 'gsap';
import styles from './Loader.module.scss';

const Loader: React.FC = () => {
  useEffect(() => {
    gsap.to(".pulsatingImg", {
      scale: 1.2, // Scale the image slightly larger
      opacity: 0.8, // Slight opacity change
      repeat: -1, // Infinite repeat
      yoyo: true, // Reverse the animation after each cycle
      duration: 1.5, // Duration of each cycle
      ease: "power1.inOut" // Smooth easing
    });
  }, []);

  return (
    <div className={styles.container}>
      <img 
        src="https://framerusercontent.com/images/4QIsgV0jA39qjUNRP0Yv00iMjI.png" 
        alt="" 
        className={`pulsatingImg ${styles.img}`} 
      />
    </div>
  );
};

export default Loader;