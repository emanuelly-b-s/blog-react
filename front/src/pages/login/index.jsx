import { Col, Row, Container } from 'react-bootstrap';
import CardLogin from '../cardLogin';
import styles from './styles.module.scss';
import NavBar from '../navbar/index.jsx';

export default function LoginPage() {

    return (
        <Col>
            <Row><NavBar /></Row>
            <div className={styles.container__row}>
                <Col xs={12} sm={8} md={4}>
                    <CardLogin />
                </Col>
            </div>
        </Col>

    )
}