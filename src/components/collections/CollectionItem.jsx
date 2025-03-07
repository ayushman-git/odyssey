'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './CollectionItem.module.css';
import { getCategoryIcon } from '@/data/collectionsData';

export default function CollectionItem({ item, category }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const categoryIcon = getCategoryIcon(category);
  
  // Render a book-styled card
  const renderBookCard = () => {
    return (
      <div className={`${styles.itemCard} ${styles.bookCard}`} onClick={() => setIsModalOpen(true)}>
        <div className={`${styles.bookSpine}`}>
          <span>{item.title}</span>
        </div>
        <div className={`${styles.imageContainer} ${styles.bookCover}`}>
          {item.coverImage && !imageError ? (
            <>
              <Image
                src={item.coverImage}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 150px, 200px"
                className={styles.coverImage}
                onError={() => setImageError(true)}
                unoptimized
              />
              <div className={styles.bookEffect}></div>
            </>
          ) : (
            <div className={styles.placeholderImage}>
              {categoryIcon}
            </div>
          )}
          <div className={styles.bookEdge}></div>
          <div className={styles.bookPages}></div>
        </div>
        <div className={styles.itemInfo}>
          <h3 className={styles.itemTitle}>{item.title}</h3>
          <p className={styles.itemCreator}>{item.creator}</p>
          <p className={styles.itemYear}>{item.year}</p>
        </div>
      </div>
    );
  };

  // Render the standard card for other categories
  const renderDefaultCard = () => {
    return (
      <div className={styles.itemCard} onClick={() => setIsModalOpen(true)}>
        <div className={styles.imageContainer}>
          {item.coverImage && !imageError ? (
            <>
              <Image
                src={item.coverImage}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 150px, 200px"
                className={styles.coverImage}
                onError={() => setImageError(true)}
                unoptimized
              />
              <div className={styles.categoryIcon}>{categoryIcon}</div>
            </>
          ) : (
            <div className={styles.placeholderImage}>
              {categoryIcon}
            </div>
          )}
        </div>
        <div className={styles.itemInfo}>
          <h3 className={styles.itemTitle}>{item.title}</h3>
          <p className={styles.itemCreator}>{item.creator}</p>
          <p className={styles.itemYear}>{item.year}</p>
        </div>
      </div>
    );
  };
  
  return (
    <>
      {category === 'books' ? renderBookCard() : renderDefaultCard()}
      
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={`${styles.modalContent} ${category === 'books' ? styles.bookModal : ''}`} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>×</button>
            <div className={styles.modalGrid}>
              <div className={styles.modalImageContainer}>
                {item.coverImage && !imageError ? (
                  <Image
                    src={item.coverImage}
                    alt={item.title}
                    width={300}
                    height={450}
                    className={styles.modalImage}
                    onError={() => setImageError(true)}
                    unoptimized
                  />
                ) : (
                  <div className={styles.modalPlaceholderImage}>
                    {categoryIcon}
                  </div>
                )}
              </div>
              <div className={styles.modalDetails}>
                <h2>{item.title}</h2>
                <p><strong>Type:</strong> {category.charAt(0).toUpperCase() + category.slice(1)}</p>
                <p><strong>Creator:</strong> {item.creator}</p>
                <p><strong>Year:</strong> {item.year}</p>
                {category === 'books' && item.pages && (
                  <p><strong>Pages:</strong> {item.pages}</p>
                )}
                {category === 'books' && item.genre && (
                  <p><strong>Genre:</strong> {item.genre}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}