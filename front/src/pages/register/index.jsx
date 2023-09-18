import { Col, Row } from "react-bootstrap";
import styles from './styles.modules.scss';
import CardRegister from "../cardRegister";
import AlertComponent from "../alertComponent";

export default function RegisterPage() {
    return (
        <Col
        
         >
            <Row 
           
            >
                <Col xs={12} sm={8} md={4}>
                    {/* <AlertComponent /> */}
                    <CardRegister />
                </Col>
            </Row>
        </Col>
    )
}

