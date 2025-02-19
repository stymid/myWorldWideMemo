import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "../components/Logo";
const PageNav = () => {
  return (
    <header>
      <nav className={styles.nav}>
        <Logo />
        <ul>
          <li>
            <NavLink to={"/pricing"}>Pricing</NavLink>
          </li>
          <li>
            <NavLink to={"/product"}>Products</NavLink>
          </li>
          <li>
            <NavLink className={styles.ctaLink} to={"/login"}>
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default PageNav;
