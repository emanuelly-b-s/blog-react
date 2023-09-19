const User = require("../model/user");
const { Author } = require("../model/author");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var CryptoJS = require("crypto-js");

require("dotenv").config();

class AuthController {
  static async register(req, res) {
    const { jsonCrypt } = req.body;
    const json = CryptoJS.AES.decrypt(jsonCrypt, "a").toString(
      CryptoJS.enc.Utf8
    );
    const { name, email, password, confirmPassword, birth } = JSON.parse(json);

    if (!name) return res.status(400).json({ message: "O nome é obrigatório" });

    if (!email)
      return res.status(400).json({ message: "O e-mail é obrigatório" });

    if (!password)
      return res.status(400).json({ message: "A senha é obrigatória" });

    if (password != confirmPassword)
      return res.status(400).json({ message: "As senhas não conferem" });

    const userExist = await User.findOne({ email: email });

    if (userExist)
      return res.status(422).json({ message: "insira outro e-mail" });

    const passwordCrypt = CryptoJS.AES.encrypt(password, "a").toString();

    const author = new Author({
      name,
      email,
      birth,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      removedAt: null,
    });

    const user = new User({
      login: email,
      author,
      email,
      password: passwordCrypt,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      removedAt: null,
    });

    try {
      await User.create(user);
      res.status(201).send({ message: "Usuário cadastrado com sucesso" });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Something failed", data: error.message });
    }
  }

  static async login(req, res) {
    const { jsonCrypt } = req.body;

    const json = CryptoJS.AES.decrypt(jsonCrypt, "a").toString(
      CryptoJS.enc.Utf8
    );

    const { email, password } = JSON.parse(json);

    if (!email)
      return res.status(422).json({ message: "O e-mail é obrigatório" });

    if (!password)
      return res.status(422).json({ message: "A senha é obrigatória" });

    const user = await User.findOne({ email: email });

    if (!user)
      return res.status(422).json({ message: "Usuário e/ou senha inválido" });

    const senha = CryptoJS.AES.decrypt(user.password, "a").toString(
      CryptoJS.enc.Utf8
    );

    if (senha != password)
      return res.status(422).send({ message: "Usuário e/ou senha inválido" });

    try {
      const secret = "a";
      const token = jwt.sign(
        {
          id: user._id,
        },
        secret,
        {
          expiresIn: "2 days",
        }
      );
      return res.status(200).send({ token: token });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Something failed", data: error.message });
    }
  }

  static async getUser(token) {

    try {
      
      console.log('teste')
    
      if (!token) 
        return res.status(401).json({ message: "Token não fornecido" });
      
      const secret = "a";

      jwt.verify(token, secret, async (err, decoded) => {
        if (err) return res.status(401).json({ message: "Token inválido" });

        const user = await User.findById(decoded.id);

        return user._id;
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro interno do servidor", data: error.message });
    }
  }
}

module.exports = AuthController;
