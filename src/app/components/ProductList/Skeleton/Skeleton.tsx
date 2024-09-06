import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './Skeleton.module.scss';

interface SkeletonProps {
  count?: number;
}

const ProductCardSkeleton: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        opacity: 0.6,
        duration: 0.75,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }
  }, []);

  return (
    <div ref={cardRef} className={styles.productCardSkeleton}>
      <div className={styles.imageWrapper}>
        <div className={styles.skeletonImage} />
      </div>
      <div className={styles.content}>
        <div className={styles.skeletonTitle} />
        <div className={styles.skeletonPrice} />
        <div className={styles.skeletonDescription} />
      </div>
    </div>
  );
};

const ProductListSkeleton: React.FC<SkeletonProps> = ({ count = 8 }) => {
  return (
    <div className={styles.grid}>
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default ProductListSkeleton;
