const {validationResult} = require("express-validator");
const adminService = require('../Services/adminService')

exports.GetUsersByEmail = (req, res) => {
    adminService.GetUsersByEmail(req.params.email).then(info => res.send(info))
}

exports.GetUsers = (req, res) => {
    adminService.GetUsers().then(info => res.send(info))
}

exports.UserLock = (req, res) => {
    const {userId} = req.body
    adminService.UserLock(userId).then(info => res.send(info))
        .catch((e) => res.status(500).send('Something went wrong!'))
}

exports.GetCardStatistics = (req, res) => {
    adminService.GetCardStatistics().then(info => res.send(info))
}

exports.CreateLocation = (req, res) => {
    const {name, type, dimension} = req.body
    adminService.CreateLocation(name, type, dimension).then(info => res.status(201).send(info))
}

exports.DeleteLocations = (req, res) => {
    adminService.DeleteLocations(req.params.id).then(info => res.send(info))
}

exports.UpdateLocation = (req, res) => {
    adminService.UpdateLocation(req.params.id, req.body.dataToUpdate).then(info => res.send(info))
}

exports.DeleteCard = (req, res) => {
    adminService.DeleteCard(req.params.id).then(info => res.send(info))
}

exports.UpdateCard = async (req, res) => {
    adminService.UpdateCard(req.params.id, req.body, req.file).then(info => res.send(info))
}

exports.CreateEpisode = (req, res) => {
    const {name, episode} = req.body
    adminService.CreateEpisode(name, episode).then(info => res.send(info))
}

exports.DeleteEpisode = (req, res) => {
    adminService.DeleteEpisode(req.params.id).then(info => res.send(info))
}

exports.UpdateEpisode = (req, res) => {
    adminService.UpdateEpisode(req.params.id, req.body.dataToUpdate).then(info => res.send(info))
}

exports.Appointment = (req, res) => {
    const {userId, role} = req.body
    adminService.Appointment(userId, role).then(info => res.send(info))
        .catch((msg) => res.status(500).send(msg))
}

exports.CreateSet = (req, res) => {
    const {set_name, set, bonus} = req.body
    adminService.CreateSet(set_name, set, bonus).then(info => res.send(info))
}

exports.GetSets = (req, res) => {
    adminService.GetSets().then(info => res.send(info))
}

exports.GetAuctions = (req, res) => {
    adminService.GetAuctions().then(info => res.send(info))
}

exports.Auction = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json({
            errors: errors.array(),
            message: 'Incorrect data'
        })
    }

    adminService.Auction({...req.body, owner: req.user.userId}).then(info => res.send(info))
}

exports.CreateCard = async (req, res) => {
    adminService.CreateCard(req.body, req.file)
        .then(info => res.send(info))
        .catch(err => res.status(err.status).send(err.message))
        .catch(() => res.status(500).send('Something went wrong. Try again!'))
}