import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import styles from './Modal.module.scss';
import { Product } from '../../utils/types';
import Button from '../Button/Button';
import Rating from '../Rating/Rating';

interface ModalProps {
  product: Product;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ product, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const { name, description, rating, promotion } = product;

  useEffect(() => {
    gsap.fromTo(
      modalRef.current,
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' }
    );
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 0.99, duration: 0.3 }
    );
  }, []);

  const handleClose = () => {
    gsap.to(modalRef.current, {
      scale: 0.5,
      opacity: 0,
      duration: 0.3,
      ease: 'power3.in',
      onComplete: onClose,
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
    });
  };

  return (
    <div ref={overlayRef} className={styles.modalOverlay} onClick={handleClose}>
      <div ref={modalRef} className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={handleClose}>
          &times;
        </button>
        <div className={styles.productInfo}>
          {promotion && (
            <div className={styles.promo}>
              <span>Promo</span>
            </div>
          )}
          <h2 className={styles.productName}>{name}</h2>
          <p className={styles.productDescription}>{description}</p>
          <Rating rating={rating} />
        </div>
        <Button className="secondary" onClick={handleClose}>
          Закрити
        </Button>
      </div>
    </div>
  );
};

export default Modal;