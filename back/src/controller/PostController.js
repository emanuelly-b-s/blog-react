const Post = require('../model/post');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

var CryptoJS = require('crypto-js')

const UserController = require('./UserController');
const fs = require('fs');
const path = require('path');

class PostController {

    static async getAll(req, res) {
        let page = req.params.page;
        let limit = 5;
        let skip = limit * (page - 1);
        try {
            const Posts = await Post.find().skip(skip).limit(limit);
            return res.status(200).send(Posts);
        } catch (error) {
            PostController.createLog(error);
            return res.status(500).send({ message: "Falha ao carregar os Artigos" });
        }
    };

    static async create(req, res) {

        const { title, text, authorid } = req.body;

        if (!title || !text || !authorid)
            return res.status(400).send({ message: "os campos não podem estarem vazios " });

        if (title.length < 3)
            return res.status(400).send({ message: "o titulo não pode ser menor que 3 caracteres" });

        if (text.length < 15)
            return res.status(400).send({ message: "o artigo não pode ser menor que 15 caracteres" });

        if (authorid.length < 3)
            return res.status(400).send({ message: "O autor não pode ser menor que 3 caracteres" });

        try {
            const author = await UserController.getAuthor(authorid);
            const Post = {
                title,
                text,
                likes: 0,
                author,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                removedAt: null,
            }
            await Post.create(Post);
            return res.status(201).send({ message: "Artigo criado com sucesso" });
        } catch (error) {
            PostController.createLog(error);
            return res.status(500).send({ error: "Falha ao salvar o artigo", data: error.message });
        }
    };

    static async likePost(req, res) {
        const { id } = req.params;
        if (!id) return res.status(400).send({ message: "No id provider" })
        try {
            const Post = await Post.findById(id);
            await Post.findByIdAndUpdate({ _id: id }, { likes: ++Post.likes })
            return res.status(200).send();
        } catch (error) {
            PostController.createLog(error);
            return res.status(500).send({ error: "Falha ao curtir", data: error.message })
        }
    }
}

module.exports = PostController;