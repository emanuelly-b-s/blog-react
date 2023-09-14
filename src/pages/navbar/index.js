import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import styles from './styles.module.scss';

export default function NavBar() {
    return (
        <Navbar expand="lg">
            <Container fluid>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: "100px" }}
                        navbarScroll
                    >
                        <div className={styles.links}>
                             <Link to='/home' className={styles.links__link}>Home</Link>
                            <Link to='/add' className={styles.links__link}>Adicionar</Link>
                        </div> 
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}