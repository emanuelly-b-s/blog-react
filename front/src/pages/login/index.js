import { Col, Row, Container } from 'react-bootstrap';
import CardLogin from '../../pages/cardLogin';
import styles from './styles.module.scss';
import NavBar from '../../pages/navbar';

export default function LoginPage() {
    return (
        <Col>
            <Row><NavBar/></Row>
            <Col className={styles.container}>
                <Row className={styles.container__row}>
                    <Col xs={12} sm={8} md={4}>
                        <CardLogin/>
                    </Col>
                </Row>
            </Col>
        </Col>

    )
}