import { useContext, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { AlertContext } from "../../context/alert";
import axios from 'axios';
import CryptoJS from 'crypto-js'
import { Secret } from '../../secret';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { LanguageContext } from "../../context/language";




export default function CardLogin() {

    const { setMessage, setShow, setVariant } = useContext(AlertContext);
    const { isPortuguese, text } = useContext(LanguageContext);

    const navigate = useNavigate();

    var [email, setEmail] = useState('');
    var [password, setPass] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        if (!formValid()) return
        const json = {
            email, password
        }
        try {
            const jsonCrypt = CryptoJS.AES.encrypt(JSON.stringify(json), 'a').toString();
            var res = await axios.post('http://localhost:8080/user/login/', {
                jsonCrypt
            });

            console.log(res)

            sessionStorage.setItem('token', res.data.token);
            navigate('/home');
        } catch (error) {
            setMessage('Erro ao se conectar');
            setShow(true);
            setVariant('danger');
        }


    }

    function formValid() {
        if (!email.includes('@')) {
            setMessage('Insira um e-mail válidos');
            setShow(true);
            setVariant('danger')
            return false;
        }
        if (email.length < 5) {
            setMessage('Insira um e-mail válido');
            setShow(true);
            setVariant('danger');
            return false;
        }
        return true
    }
    return (
        <div className={styles.card}>
            <Card.Title className={styles.card__header}>Login</Card.Title>
            <Card.Body>
                <Form
                    className={styles.card__form}
                    onSubmit={handleSubmit}
                >
                    <Form.Control
                        value={email}
                        className={styles.form__control}

                        placeholder={isPortuguese ? "Digite seu email" : "Enter your email."}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Control
                        value={password}
                        className={styles.form__control}
                        placeholder={isPortuguese ? "Digite sua senha" : "Enter your password."}
                        onChange={(e) => setPass(e.target.value)}
                    />
                    <Button
                        className={styles.card__form__button}
                        type='submit'
                    >
                        {isPortuguese ? "Entrar" : "Sign in"}
                    </Button>
                </Form>
            </Card.Body>
            <div className={styles.card__footer}>
                <div className={styles.link}>
                    <Link className={styles.links__link} to='/register' >{isPortuguese ? "Não possui uma conta?" : "Don't have an account?"}
                    </Link>
                    <Link className={styles.links__link} to='/register'>{isPortuguese ? "Registre-se" : "Sign up."}
                    </Link>
                </div>
            </div>
        </div>
    )
}