import React, { useEffect } from 'react';
import gsap from 'gsap';
import styles from './ErrorMessage.module.scss';

const ErrorMessage: React.FC = () => {
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".error-img",
      { scale: 1.5 },
      { scale: 1, duration: 1.5, ease: "power2.out" }
    );

    tl.fromTo(
      ".error-text",
      { scale: 0.5 },
      { scale: 1, duration: 1.5, ease: "power2.out" },
      "<"
    );
  }, []);

  return (
    <div className={styles.container}>
      <img
        src="https://framerusercontent.com/images/4QIsgV0jA39qjUNRP0Yv00iMjI.png"
        alt="Error"
        className={`error-img ${styles.img}`}
      />
      <p className={`error-text ${styles.text}`}>Can't find products with this filters</p>
    </div>
  );
};

export default ErrorMessage;