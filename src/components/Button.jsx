/* eslint-disable react/prop-types */
import Styles from "./Button.module.css";

const Button = ({ children, onClick, type }) => {
  return (
    <button onClick={onClick} className={`${Styles.btn} ${Styles[type]}`}>
      {children}
    </button>
  );
};

export default Button;
