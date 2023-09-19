import { useCallback, useEffect, useState } from "react";
import {
    Button,
    Card,
    Container
} from 'react-bootstrap';
import axios from 'axios';
import { AiOutlineLike } from 'react-icons/ai';
import styles from './styles.module.scss';

export default function Post() {

    var [artigos, setArtigos] = useState([]);

    function getPosts() {
        axios.get(`http://localhost:8080/post`)
            .then(response => {
                const artigo = response.data;
                setArtigos(artigo);
            });
    };

    useEffect(() => {
        getPosts();
    }, []);

    const RenderPosts = () => {
        return artigos.map((artigo) => {
            return (
                <Container >
                    <Card key={artigo.id} className={styles.card} >
                        <Card.Title >
                            {artigo.title}
                        </Card.Title>
                        <Card.Body >
                            <Card.Text >{artigo.text}</Card.Text>
                            <div className='d-flex align-items-cente'>
                                {artigo.likes}<Button variant='light'><AiOutlineLike /></Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>
            );
        });
    };

    return (
        <Container>
            <RenderPosts />
        </Container>
    )
}

