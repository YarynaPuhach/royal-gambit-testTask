import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ProductCard.module.scss';
import { Product } from '@/app/utils/types';
import Rating from '../Rating/Rating';
import Button from '../Button/Button';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { id, name, description, image, rating, active, promotion } = product;
  const uniqueImageUrl = `${image}?id=${id}`;
  return (
    <div className={`${styles.card} ${active ? '' : styles.inactive} `}>
      <div className={styles.imageContainer}>
        <Image
          src={uniqueImageUrl}
          alt={name}
          fill
          sizes="288px"
          className={`${styles.image} ${!active ? styles.inactiveImage : ''}`}
        />
        {promotion && (
          <div className={styles.promoFlag}>
            <span>Promo</span>
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div>
          <h3 className={styles.title}>{name}</h3>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.footer}>
          <Rating rating={rating} />
          <Button magnetic={active} onClick={onClick}>
            {active ? 'Show details': 'Unavailable'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;