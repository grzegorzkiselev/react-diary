import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import styles from "./SelectUser.module.css";

export function SelectUser() {
  const { userId, setUserId } = useContext(UserContext);

  const changeUser = (event) => {
    setUserId(Number(event.target.value));
  };

  return (
    <select className={styles.select} name="user" id="user" value={userId} onChange={changeUser}>
      <option value="1">Я</option>
      <option value="2">Не я</option>
    </select>
  );
}
