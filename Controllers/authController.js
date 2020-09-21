const authService = require('./../Services/authService')
const {validationResult} = require('express-validator')

exports.Register = (req, res) => {
    const {name, email, password} = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json({
            errors: errors.array(),
            message: 'Incorrect data'
        })
    }
    authService.Register(name, email, password)
        .then(data => res.send(data))
        .catch(err => res.status(err.status).send(err.message))
        .catch(() => res.status(500).send('Something went wrong. Try Again!'))
}

exports.Login = (req, res) => {
    const {email, password} = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json({
            errors: errors.array(),
            message: 'Incorrect data'
        })
    }
    return authService.Login(email, password)
        .then(data => res.send(data))
        .catch(err => res.status(err.status).send(err.message))
        .catch(() => res.status(500).send('Something went wrong. Try Again!'))
}
