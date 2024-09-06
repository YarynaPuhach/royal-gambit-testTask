import React, { useEffect } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import styles from './Loader.module.scss';

const Loader: React.FC = () => {
  useEffect(() => {
    gsap.to(".pulsatingImg", {
      scale: 1.2,
      opacity: 0.8,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "power1.inOut"
    });
  }, []);

  return (
    <div className={styles.container}>
      <Image 
        src="https://framerusercontent.com/images/4QIsgV0jA39qjUNRP0Yv00iMjI.png" 
        alt="Loading.." 
        height='200'
        width='200'
        className={`pulsatingImg ${styles.img}`} 
      />
    </div>
  );
};

export default Loader;