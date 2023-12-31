import { useCallback, useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import axios from "axios";
import { AiOutlineLike } from "react-icons/ai";
import styles from "./styles.module.scss";
import CryptoJS from "crypto-js";
import { useNavigate, useSearchParams } from "react-router-dom";


export default function Post() {
  var [artigos, setArtigos] = useState([]);
  const [liked, setLiked] = useState(false);
  var navigate = useNavigate();

  async function getPosts() {
    await axios.get(`http://localhost:8080/post`).then((response) => {
      const artigo = response.data;
      setArtigos(artigo);
    });
  }

  async function handleLikeClick(postId) {

    const token = sessionStorage.getItem('token');

    const informations = { token };

    const jsonCrypto = CryptoJS.AES.encrypt(JSON.stringify(informations).toString(), 'a').toString();


    try {
      var response = await axios.post(
        `http://localhost:8080/post/like/${postId}`,
        { jsonCrypto }
      );


      if (response.ok) {
        setLiked(!liked);
        getPosts();
      }



    } catch (error) {
      console.error("Erro ao curtir a postagem:", error);
    }

    getPosts();

  }



  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token)
      navigate('/login');

    getPosts();
  }, []);

  const RenderPosts = () => {
    return artigos.map((artigo) => {
      return (
        <Container>
          <Card key={artigo.id} className={styles.card}>
            <Card.Title>{artigo.title}</Card.Title>
            <Card.Body>
              <Card.Text>{artigo.text}</Card.Text>
              <div className="d-flex align-items-cente">
                {artigo.likes.length}
                <Button onClick={() => handleLikeClick(artigo._id)}>
                  {liked ? "Descurtir" : "Curtir"}
                  <AiOutlineLike />
                </Button>
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
  );
}
