import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Footer from "./Footer";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />
      <Footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; CopyRight {new Date().getFullYear()} by worldwise Inc!
        </p>
      </Footer>
    </div>
  );
};

export default Sidebar;
