const User = require('../model/login');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

class AuthController {

    static async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400)
                .send({ message: "Email or password not provider" })


        try {
            const user = await User.findOne({ email })
            if (!user)
                return res.status(400).send({ message: "Invalid Email or password" })
            if (!await bcrypt.compare(password, user.password)) {
                return res.status(400).send({ message: "Invalid Email or password" })
            }
            const secret = process.env.SECRET;
            const token = jwt.sign(
                {
                    id: user._id,
                },
                secret,
                {
                    expiresIn: '2 days'
                }

            );
            return res.status(200).send({ token: token })
        } catch (error) {
            return res.status(500).send({ message: "Something failed" })
        }
    }
}

module.exports = AuthController;
