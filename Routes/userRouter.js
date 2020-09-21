const express = require('express')
const userController = require('./../Controllers/userController')
const userRouter = express.Router()
const checkBalance = require('../helpers/middlewares/checkBalance.middleware')

userRouter.get('/cards', userController.GetCardsInfo)
userRouter.get('/card/:id', userController.GetCardById)
userRouter.get('/locations', userController.GetLocations)
userRouter.get('/location/:id', userController.GetLocationById)
userRouter.get('/episodes', userController.GetEpisodes)
userRouter.get('/episodes/:id', userController.GetEpisodeById)

userRouter.post('/place-a-bet',checkBalance, userController.PlaceABet)

module.exports = userRouter;