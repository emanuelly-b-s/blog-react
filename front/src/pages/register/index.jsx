import { Col, Row } from "react-bootstrap";
import styles from './styles.modules.scss';
import CardRegister from "../cardRegister";
import AlertComponent from "../alertComponent";
import NavBar from '../navbar/index.jsx';


export default function RegisterPage() {
    return (
        <Col>
        <Row><NavBar /></Row>
        <Col className={styles.container}>
            <Row className={styles.container}>
                <Col xs={12} sm={8} md={4} className={styles.container}>
                    <CardRegister />
                </Col>
            </Row>
        </Col>
    </Col>

    )
}

