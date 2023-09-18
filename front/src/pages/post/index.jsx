import { useEffect, useState } from 'react';
import {
    Button,
    Card,
    Container
} from 'react-bootstrap'
import { AiOutlineLike } from 'react-icons/ai'
import styles from './styles.module.scss';

export default function Post() {
    var [artigos, setArtigos] = useState([]);
    function getPosts() {
        setArtigos([
            {
                id: 1,
                title: 'teste 1',
                text: 'Teste',
                likes: 10
            },
            {
                id: 2,
                title: 'teste 2',
                text: 'Teste 2',
                likes: 5
            },
        ])
    };

    useEffect(() => {
        getPosts();
    }, []);

    const RenderPosts = () => {
        return artigos.map((artigo) => {
            return (
                <Card key={artigo.id}  >
                    <Card.Title >
                        {artigo.title}
                    </Card.Title>
                    <Card.Body >
                        <Card.Text >{artigo.text}</Card.Text>
                        <div className='d-flex align-items-center '>
                            {artigo.likes}<Button variant='light'><AiOutlineLike /></Button>
                        </div>
                    </Card.Body>
                </Card>
            )
        })
    }

    return (
        <Container>
            <RenderPosts />
        </Container>
    )
}
