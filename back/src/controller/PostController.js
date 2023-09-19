const Post = require("../model/post");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const Interaction = require("../model/postInteractions");

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
        likes: 0,
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

    const { postId, token } = JSON.parse(json);

    const user = await UserController.getUser(token);
    console.log(user);

    if (!user) return res.status(401).send({ message: "error: Invalid-token" });

    if (!postId) return res.status(400).send({ message: "No id provider" });

    try {
      const existingLike = await Interaction.findOne({
        postId,
        userId,
        type: "like",
      });

      if (existingLike)
        return res.status(400).json({ error: "Você já curtiu esta postagem." });

      const newLike = new Like({ postId, userId });
      await newLike.save();
      await Post.findByIdAndUpdate(postId, { $inc: { likes: 1 } });

      return res.status(200).json({ message: "Postagem curtida com sucesso." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }

  static async dislikePost(req, res) {
    const { jsonCrypto } = req.body;

    const json = CryptoJS.AES.decrypt(jsonCrypto, "a").toString(
      CryptoJS.enc.Utf8
    );

    const { postId, token } = JSON.parse(json);

    const user = await UserController.getUser(token);
    console.log(user);

    if (!user) return res.status(401).send({ message: "error: Invalid-token" });

    if (!postId) return res.status(400).send({ message: "No id provider" });

    try {
      const existingLike = await Interaction.findOne({
        postId,
        user: user._id,
        type: "like",
      });

      if (!existingLike)
        return res
          .status(400)
          .json({ error: "Você ainda não curtiu esta postagem." });

      await existingLike.remove();

      await Post.findByIdAndUpdate(postId, { $inc: { likes: -1 } });

      return res.status(200).json({ message: "Curtida removida com sucesso." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
}

module.exports = PostController;
