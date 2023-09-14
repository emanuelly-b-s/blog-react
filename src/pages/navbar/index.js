import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from './styles.module.scss';


export default function NavBar() {
    return (

        <Nav className={styles.nav}>
            <div className={styles.supergraphic} />
            <div className={styles.subnavbar}>
                <div className={styles.logo} />
                <div className={styles.links}>
                    <Link to='/home' className={styles.links_link}>Home</Link>
                    <Link to='/add' className={styles.links_link}> Adicionar</Link>
                </div>
            </div>
        </Nav>

    );
}