import AppNav from '../../components/layout/AppNav';
import styles from './index.module.css';

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <AppNav />
    </div>
  );
}
