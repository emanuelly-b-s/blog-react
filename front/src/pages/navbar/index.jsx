import Navbar from "react-bootstrap/Navbar";
import { Link, Outlet } from "react-router-dom";
import styles from "./styles.module.scss";
import { LanguageContext } from "../../context/language";
import { useContext } from "react";
import { GiExitDoor } from "react-icons/gi";

export default function NavBar() {
  const { setLanguage, text } = useContext(LanguageContext);

  function logOut() {
    sessionStorage.removeItem("token");
  }

  return (
    <>
      <section className={styles.container}>
        <div className={styles.upside}>
          <div className={styles.logo}></div>
        </div>
        <div className={styles.content}>
          <div className={styles.links}>
            <Link to="/home" className={styles.links__link}>
              {text.home}
            </Link>
            <Link to="/add" className={styles.links__link}>
              {text.add}
            </Link>
            <div className={styles.buttons}>
              <Link className={styles.links__link} to="/">
                <button onClick={() => logOut()}>{text.logout}</button>
              </Link>
            </div>
            <div className={styles.buttons}>
              <button onClick={() => setLanguage()}>{text.abbreviation}</button>
            </div>
          </div>
        </div>
      </section>
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </>
  );
}
