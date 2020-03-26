import mongoose from "mongoose"
import User from "../models/user"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

export const UserController = {

    // TODO: handle user already exists
    login: (req, res) => {
        const { username, password } = req.body

        mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }, err => {
            let result = {}
            let status = 200
            if (!err) {
                User.findOne({ username }, (err, user) => {
                    if (!err && user) {
                        let hash = user.password
                        hash = hash.replace(/^\$2y(.+)$/i, '$2a$1')
                        if (bcrypt.compareSync(password, hash)) {
                            // Create a token
                            const payload = { user: user.name }
                            const options = { expiresIn: "2d", issuer: "http://abes-app.org.br" }
                            const secret = process.env.JWT_SECRET
                            const token = jwt.sign(payload, secret, options)

                            result.token = token
                            result.status = status
                            result.result = user
                            res.status(status).send(result)
                        } else {
                            result.status = 404
                            result.error = 'Credenciais inválidas'
                            res.status(404).send(result)
                        }
                    } else if (!err) {
                        result.status = 404
                        result.error = 'Usuário não encontrado'
                        res.status(404).send(result)
                    } else {
                        result.status = 404
                        result.error = err
                        res.status(404).send(result)
                    }
                })
            } else {
                result.status = 500
                result.error = err
                res.status(500).send(result)
            }
        })
    },
    signup: (req, res) => {
        mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }, err => {
            let result = {}
            let status = 201
            if (!err) {
                const user = new User({
                    name: req.body.name,
                    password: req.body.password,
                    username: req.body.username,
                    cnpj: req.body.cnpj,
                }) // document = instance of a model
                // TODO: We can hash the password here before we insert instead of in the model
                user.save((err, user) => {
                    if (!err) {
                        result.status = status
                        result.result = user
                    } else {
                        status = 500
                        result.status = status
                        result.error = err
                    }
                    res.status(status).send(result)
                })
            } else {
                status = 500
                result.status = status
                result.error = err
                res.status(status).send(result)
            }
        })
    },
}
