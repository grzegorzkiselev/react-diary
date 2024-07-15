import { SelectUser } from "../SelectUser/SelectUser";
import styles from "./Header.module.css";

function Header() {
  return (
    <>
      <img src="/logo.svg" alt="" className={styles.logo} />
      <SelectUser />
    </>
  );
}

export default Header;
