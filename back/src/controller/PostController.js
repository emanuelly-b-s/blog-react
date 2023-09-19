const Post = require('../model/post');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

var CryptoJS = require('crypto-js')

const UserController = require('./UserController');
const fs = require('fs');
const path = require('path');
const AuthorController = require('./AuthorController');

class PostController {

    static async getAll(req, res) {

        let page = req.params.page;
        let limit = 5;
        let skip = limit * (page - 1);
        try {
            const posts = await Post.find().skip(skip).limit(limit);
            return res.status(200).send(posts);
        } catch (error) {
            return res.status(500).send({ message: "Falha ao carregar os Artigos" })
        }
    };

    static async register(req, res) {

        const { jsonCrypto } = req.body;

        const json = CryptoJS.AES.decrypt(jsonCrypto, 'a').toString(CryptoJS.enc.Utf8);

        const { token, title, text } = JSON.parse(json);

        if (!title || !text)
            return res.status(400).send({ message: "post data not found" });

        const verified = jwt.verify(token, 'a').id;

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
            }

            console.log(post)
            await Post.create(post);
            return res.status(201).send({ message: "Artigo criado com sucesso" });

        } catch (error) {
            console.log(error)
            return res.status(500).send({ error: "Falha ao salvar o artigo", data: error.message });
        }
    };

    static async likePost(req, res) {

        const { jsonCrypto } = req.body;
        const json = CryptoJS.AES.decrypt(jsonCrypto, 'a').toString(CryptoJS.enc.Utf8);
        const { postId, token } = JSON.parse(json);

        const verified = jwt.verify(token, 'a').id;

        if (!postId) return res.status(400).send({ message: "No id provider" });

        try {

            const post = await Post.findById(postId);
            const index = post.likes.indexOf(verified);

            index !== -1 ?
                post.likes.splice(index, 1) : post.likes.push(verified);

            post.save();

            return res.status(200).send({ data: post });

        } catch (error) {
            console.log(error)
            return res.status(500).send({ error: "Falha ao curtir", data: error.message })
        }
    }
}

module.exports = PostController;