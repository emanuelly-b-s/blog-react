import { useCallback, useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import axios from "axios";
import { AiOutlineLike } from "react-icons/ai";
import styles from "./styles.module.scss";
import CryptoJS from "crypto-js";

export default function Post() {
  var [artigos, setArtigos] = useState([]);
  const [liked, setLiked] = useState(false);

  async function getPosts() {
    await axios.get(`http://localhost:8080/post`).then((response) => {
      const artigo = response.data;
      setArtigos(artigo);
    });
  }

  async function handleLikeClick(postId) {
    const token = sessionStorage.getItem("token");

    const informations = { postId, token };

    const jsonCrypto = CryptoJS.AES.encrypt(
      JSON.stringify(informations).toString(),
      "a"
    ).toString();

    try {
      if (liked)
        var response = await axios.post(
          `http://localhost:8080/post/like/${postId}`,
          { jsonCrypto }
        );
      else
        var response = await axios.delete(
          `http://localhost:8080/post/like/${postId}`,
          { jsonCrypto }
        );

      // const response = await fetch(
      //   `/http://localhost:8080/post/like/${postId}`,
      //   {
      //     method: liked ? "DELETE" : "POST",
      //     body: CryptoJS.AES.encrypt(
      //       JSON.stringify(informations).toString(),
      //       "a"
      //     ).toString(),
      //   }
      // );

      if (response.ok) {
        setLiked(!liked);
        getPosts();
      }
    } catch (error) {
      console.error("Erro ao curtir a postagem:", error);
    }
  }

  async function handleClick(id) {
    await axios.post(`http://localhost:8080/post/like/${id}`);
    getPosts();
  }

  useEffect(() => {
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
                {artigo.likes}
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
