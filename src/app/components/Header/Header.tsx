'use client'
import React from 'react';
import styles from './Header.module.scss';
import Button from '../Button/Button';
import Filters from '../Filter/Filter';
import SearchBar from '../SearchBar/SearchBar';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
      <div className={styles.logo}>Logo</div>
      <div className={styles.filtersSearch}>
        <Filters/>
        <SearchBar/>
      </div>
      <Button className={'secondary'} magnetic={false}>Log in</Button>
      </div>
    </header>
  );
};

export default Header;