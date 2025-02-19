import styles from "./Sidebar.module.css";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      {" "}
      <p className={styles.copyright}>
        &copy; CopyRight {new Date().getFullYear()} by worldwise Inc!
      </p>
    </footer>
  );
};

export default Footer;
