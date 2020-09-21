const Cards = require('../models/Cards')
const ObjectId = require('mongoose').Types.ObjectId
const Locations = require('../models/Locations')
const Episodes = require('../models/Episodes')
const Auctions = require('../models/Auctions')
const Bets = require('../models/Bets')

exports.GetCardsInfo = async () => {
    try {
        return await Cards.find().populate(['locations', 'episodes'])
    } catch (e) {
        return 'Something went wrong. Try again!'
    }
}

exports.GetCardById = async (id) => {
    try {
        if (!ObjectId.isValid(id))
            return 'Id is not valid'

        const isExist = await Cards.findOne({_id: id})

        if (!isExist)
            return 'User with such ID not found!'

        return Cards.findOne({_id: id})
    } catch (e) {
        return 'Something went wrong. Try again!'
    }
}

exports.GetLocations = async () => {
    try {
        return await Locations.find()
    } catch (e) {
        return 'Something went wrong. Try again!'
    }
}

exports.GetLocationById = async (id) => {
    try {
        if (!ObjectId.isValid(id))
            return 'Id is not valid'

        const location = await Locations.findOne({_id: id})

        if (!location)
            return 'Location not found!'

        return location
    } catch (e) {
        return 'Something went wrong. Try again!'
    }
}

exports.GetEpisodes = async () => {
    try {
        return await Episodes.find()
    } catch (e) {
        return 'Something went wrong. Try again!'
    }
}

exports.GetEpisodeById = async (id) => {
    try {
        const episode = await Episodes.findOne({_id: id})

        if (!episode)
            return 'Location not found!'

        return episode
    } catch (e) {
        return 'Something went wrong. Try again!'
    }
}

exports.PlaceABet = async (auctionId, userId, bet) => {
    try {
        const auction = await Auctions.findOne({_id: auctionId})
        console.log(auction)
        if (auction) {
            if (!ObjectId.isValid(auctionId) || !ObjectId.isValid(userId))
                return 'Id is not valid'

            if (auction.end_auction < Date.now())
                return 'Auction ended'

            if (auction.start_bet > bet)
                return `The starting bid must be greater than ${auction.start_bet}`

            const lastBid = await Bets.findOne({auction: auctionId}, {}, {sort: {'bet': -1}})

            if (lastBid) {
                if (bet < lastBid.bet + auction.min_step_bet)
                    return `Bid must will be greater than ${lastBid.bet + auction.min_step_bet}`

                if (auction.max_bet && lastBid.bet >= auction.max_bet)
                    return 'The maximum rate has already been set'
            }

            const newBet = await Bets({auction: auctionId, user: userId, bet})
            await newBet.save()

            const futureTime = Date.now() + parseInt(auction.min_extension_time)
            if (new Date(auction.end_auction.toISOString()) <= futureTime) {
                let extension = futureTime - new Date(auction.end_auction.toISOString())
                await Auctions.updateOne({_id: auction._id}, {end_auction: new Date(auction.end_auction.getTime() + extension)})
            }

            return 'Bet accepted.'
        }
    } catch (e) {
        console.log(e)
        return 'Something went wrong. Try again!'
    }
}

