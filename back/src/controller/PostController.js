const Post = require("../model/post");
const User = require("../model/user");
const jwt = require("jsonwebtoken");


require("dotenv").config();

var CryptoJS = require("crypto-js");

const UserController = require("./UserController");
const fs = require("fs");
const path = require("path");
const AuthorController = require("./AuthorController");

class PostController {
  static async getAll(req, res) {
    let page = req.params.page;
    let limit = 5;
    let skip = limit * (page - 1);
    try {
      const posts = await Post.find().skip(skip).limit(limit);
      return res.status(200).send(posts);
    } catch (error) {
      return res.status(500).send({ message: "Falha ao carregar os Artigos" });
    }
  }

  static async register(req, res) {
    const { jsonCrypto } = req.body;

    const json = CryptoJS.AES.decrypt(jsonCrypto, "a").toString(
      CryptoJS.enc.Utf8
    );

    console.log(jsonCrypto)

    const { token, title, text } = JSON.parse(json);

    if (!title || !text)
      return res.status(400).send({ message: "post data not found" });

    const verified = jwt.verify(token, "a").id;

    if (!verified)
      return res.status(401).send({ message: "error: Invalid-token" });

    try {
      const author = await AuthorController.getAuthor(verified);

      const post = {
        title,
        text,
        likes: [],
        author,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        removedAt: null,
      };

      console.log(post);
      await Post.create(post);

      return res.status(201).send({ message: "Artigo criado com sucesso" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({ error: "Falha ao salvar o artigo", data: error.message });
    }
  }

  static async likePost(req, res) {
    const { jsonCrypto } = req.body;

    const json = CryptoJS.AES.decrypt(jsonCrypto, "a").toString(
      CryptoJS.enc.Utf8
    );

    const { token } = JSON.parse(json);

    var postId = req.params;

    const verified = jwt.verify(token, "a").id;

    if (!verified)
      return res.status(401).send({ message: "error: Invalid-token" });

    if (!postId) return res.status(400).send({ message: "No id provider" });

    console.log(postId)

    try {

      const post = await Post.findById(postId.id);

      if (!post) {
        return res.status(404).send({ message: "Post not found" });
      }

      if (post.likes.includes(verified)) {
        return res.redirect(`http://localhost:8080/post/deslike/${postId}`, {verified});
      }

      const temp = post.likes;
      temp.push(verified);
      post.likes = temp;
      await post.save();

      res.status(200).send({ message: "Post liked successfully" });

    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal server error" });
    }

  }
}

module.exports = PostController;
