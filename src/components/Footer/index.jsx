import styles from './index.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; Copyright {new Date().getFullYear()} by Worldwide inc.
      </p>
    </footer>
  );
};

export default Footer;
