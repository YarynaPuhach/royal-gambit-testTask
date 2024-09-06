import { useState, useCallback, useMemo } from 'react';
import { debounce } from 'lodash';
import { useProductContext } from '@/app/context/ProductsContext';
import styles from './SearchBar.module.scss';

function SearchBar() {
  const { setSearchQuery } = useProductContext();
  const [inputValue, setInputValue] = useState('');

  const debouncedSetSearchQuery = useMemo(
    () => debounce((query: string) => setSearchQuery(query), 1000),
    [setSearchQuery]
  );

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setInputValue(query); 
    debouncedSetSearchQuery(query); 
  }, [debouncedSetSearchQuery]);

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Пошук"
        className={styles.searchInput}
      />
      <button type="button" className={styles.searchButton}>
        <span role="img" aria-label="search">
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.6721 14H16.4621L21.4521 19L19.9621 20.49L14.9621 15.5V14.71L14.6921 14.43C13.5521 15.41 12.0721 16 10.4621 16C6.8721 16 3.9621 13.09 3.9621 9.5C3.9621 5.91 6.8721 3 10.4621 3C14.0521 3 16.9621 5.91 16.9621 9.5C16.9621 11.11 16.3721 12.59 15.3921 13.73L15.6721 14ZM5.9621 9.5C5.9621 11.99 7.9721 14 10.4621 14C12.9521 14 14.9621 11.99 14.9621 9.5C14.9621 7.01 12.9521 5 10.4621 5C7.9721 5 5.9621 7.01 5.9621 9.5Z"
              fill="#1A1B1D"
            />
          </svg>
        </span>
      </button>
    </div>
  );
}

export default SearchBar;