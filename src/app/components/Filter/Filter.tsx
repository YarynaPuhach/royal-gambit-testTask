import { useProductContext } from '../../context/ProductsContext';
import styles from './Filters.module.scss';

function Filters() {  
  const { promotional, setPromotional, active, setActive } = useProductContext();

  return (
    <div className={styles.filters}>
      <label className={styles.filterLabel}>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
        />
        <span className={styles.filterText}>Active</span>
      </label>
      <label className={styles.filterLabel}>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={promotional}
          onChange={(e) => setPromotional(e.target.checked)}
        />
        <span className={styles.filterText}>Promo</span>
      </label>
    </div>
  );
}

export default Filters;