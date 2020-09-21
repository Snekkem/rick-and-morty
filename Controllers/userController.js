const userService = require('./../Services/userService')
const {validationResult} = require('express-validator')

exports.GetCardsInfo = (req, res) => {
    userService.GetCardsInfo().then(info => res.json(info))
}

exports.GetCardById = (req, res) => {
    userService.GetCardById(req.params.id).then(info => res.send(info))
}

exports.GetLocations = (req, res) => {
    userService.GetLocations().then(info => res.send(info))
}

exports.GetLocationById = (req, res) => {
    userService.GetLocationById(req.params.id).then(info => res.send(info))
}

exports.GetEpisodes = (req, res) => {
    userService.GetEpisodes().then(info => res.send(info))
}

exports.GetEpisodeById = (req, res) => {
    userService.GetEpisodeById(req.params.id).then(info => res.send(info))
}

exports.PlaceABet = (req, res) => {
    const {auction, user, bet} = req.body
    userService.PlaceABet(auction, user, bet).then(info => res.send(info))
}

