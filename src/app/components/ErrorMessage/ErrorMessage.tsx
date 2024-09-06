import React, { useEffect } from 'react';
import gsap from 'gsap';
import styles from './ErrorMessage.module.scss';
import Image from 'next/image';

const ErrorMessage: React.FC = () => {
  useEffect(() => {
    gsap.to(".error-img", {
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
        alt="Error"
        height='200'
        width='200'
        className={`error-img ${styles.img}`}
      />
      <p className={`error-text ${styles.text}`}>Can`t find products with this filters</p>
    </div>
  );
};

export default ErrorMessage;