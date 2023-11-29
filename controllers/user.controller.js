const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.userController = {
    getOneUser : async (req, res) => {
        try {
            const users = await User.findById(req.user.id);
            res.json(users);
        } catch (error) {
            res.json({error: error.message});
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users)
        } catch (error) {
            res.json({error: error.message});
        }
    },
    addUsers : async (req, res) => {
        const { login, password, admin } = req.body;
        const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS));

        const user = await User.create({
            login: login,
            password: hash,
            avatar: req.file.path,
            admin
        });

        res.json(user);
    },
    login: async (req, res) => {
        const { login, password } = req.body;
        const candidate = await User.findOne({ login: login });
        if(!candidate) {
            return res.status(401).json({error: "неверный логин"});
        }

        const valid = await bcrypt.compare(password, candidate.password);
        if(!valid) {
            return res.status(401).json({error: "неверный пароль"});
        }
        const payload = {
            id: candidate._id,
        };
        const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
            expiresIn: "24h",
        });
        res.json({ token, id: payload.id });
    },
};