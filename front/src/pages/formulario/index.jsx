import { useContext, useState } from "react";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import {
    Button,
    Col,
    Container,
    Form,
    Row
} from "react-bootstrap";
import styles from './styles.module.scss';
import { AlertContext } from "../../context/alert";


export default function Formulario() {

    const { setMessage, setShow, setVariant } = useContext(AlertContext);

    var [title, setTitle] = useState('');
    var [text, setText] = useState('');

    async function handleSubmit(e) {

        e.preventDefault();
        
        try {
            const token = sessionStorage.getItem('token');
            const decodeToken = jwt_decode(token)
            const { id } = decodeToken;
            const res = await axios.post('http://localhost:8080/api/article', {
                authorid: id, title, text
            });
            setMessage(res.data.message);
            setShow(true);
            setVariant('success');
            setTitle('');
            setText('');

        } catch (error) {
            console.log(error);
            setMessage("Erro ao inserir o artigo, reveja as informações e tente novamente");
            setShow(true);
            setVariant('danger');
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    {/* className={styles.form} */}
                    <Form onSubmit={handleSubmit}>
                        {/* className={styles.form__title} */}
                        <Form.Text >Digite Aqui seu Artigo</Form.Text>
                        <Form.Control
                            placeholder="Autor"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                        <Form.Control
                            placeholder="Titulo"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <Form.Control
                            as='textarea'
                            placeholder="Texto"
                            rows={5}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        {/* className={styles.form__div} */}
                        <Col xs={12} sm={9} md={6} >
                            {/* className={styles.form__div__button} */}
                            <Button type="submit"  >Salvar</Button>
                        </Col>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}