const Cards = require('../models/Cards')
const Users = require('../models/Users')
const Locations = require('../models/Locations')
const Episodes = require('../models/Episodes')
const Settings = require('../models/Settings')
const ObjectId = require('mongoose').Types.ObjectId
const Bets = require('../models/Bets')
const Auctions = require('../models/Auctions')
const config = require('config')
const Sets = require('../models/Sets')
const _ = require('lodash')
const ResponseError = require('../helpers/ResponseError')

exports.GetUsersByEmail = async (email) => {
    try {
        return await Users.findOne({email})
    } catch (e) {
        return 'Something went wrong. Try again!'
    }
}

exports.GetUsers = async () => {
    try {
        return await Users.find()
    } catch (e) {
        return 'Something went wrong. Try again!'
    }
}

exports.UserLock = async (userId) => {
    try {
        const user = await Users.findOne({_id: userId})

        user.is_active = !user.is_active

        await user.save()
        return {userId: user._id, is_active: user.is_active}
    } catch (e) {
        throw new Error("Something went wrong. Try again!")
    }
}

exports.GetCardStatistics = async () => {
    try {
        const allCards = await Cards.find()
        const allSets = await Sets.find()
        const allUsers = await Users.find()

        return {Cards: allCards.length, Sets: allSets.length, Users: allUsers.length}
    } catch (e) {
        return 'Something went wrong. Try again!'
    }
}

exports.CreateLocation = async (name, type, dimension) => {
    try {
        const location = new Locations({name, type, dimension})

        await location.save()
        return location
    } catch (e) {
        return 'Something went wrong. Try again!'
    }
}

exports.DeleteLocations = async (id) => {
    try {
        if (!ObjectId.isValid(id))
            return 'Id is not valid'

        const location = await Locations.findOne({_id: id})
        await location.deleteOne()
        return 'Location deleted!'
    } catch (e) {
        return 'Something went wrong. Try again!'
    }
}

exports.UpdateLocation = async (id, dataToUpdate) => {
    try {
        if (!ObjectId.isValid(id))
            return 'Id is not valid'

        const location = await Locations.findOne({_id: id})
        if (!location)
            return 'Location not found!'

        location.name = dataToUpdate.name.toString()
        location.type = dataToUpdate.type.toString()
        location.dimension = dataToUpdate.dimension.toString()

        await location.save()

        return location
    } catch (e) {
        return 'Something went wrong. Try again!'
    }
}

exports.CreateEpisode = async (name, episode) => {
    try {
        const createdEpisode = new Episodes({name, episode})
        return await createdEpisode.save()
    } catch (e) {
        return 'Something went wrong. Try again!'
    }
}

exports.DeleteEpisode = async (id) => {
    try {
        if (!ObjectId.isValid(id))
            return 'Id is not valid'

        const episode = await Episodes.findOne({_id: id})

        await episode.deleteOne()
        return 'Episode deleted!'
    } catch (e) {
        return 'Something went wrong. Try again!'
    }
}

exports.UpdateEpisode = async (id, dataToUpdate) => {
    try {
        const episode = await Episodes.findOne({_id: id})

        if (!episode)
            return 'Location not found!'

        episode.name = dataToUpdate.name
        episode.episode = dataToUpdate.episode

        await episode.save()

        return episode
    } catch (e) {
        return 'Something went wrong. Try again!'
    }
}

const checkId = async (item) => {
    for await (const l of item) {
        if (!ObjectId.isValid(l)) {
            return 'Id is not valid'
        }
    }
}

exports.CreateCard = async (cardData, image) => {
    const allCards = await Cards.find(null, null, {sort: {created_at: 1}}).limit(671)

    for (const card of allCards) {
        if (card.is_active === false)
            return 'Not all cards have been sold yet!'
    }

    await Settings({can_create_cards: true}).save()

    let error = await checkId(cardData.locations)
    if (error)
        throw new ResponseError(400, error)

    error = await checkId(cardData.episodes)
    if (error)
        throw new ResponseError(400, error)

    const location = await Locations.find({_id: cardData.locations})
    const episode = await Episodes.find({_id: cardData.episodes})

    if (location.length === 0)
        throw new ResponseError(400, 'Such location is not exists!')

    if (episode.length === 0)
        throw new ResponseError(400, 'Such episodes is not exists!')

    if (!image)
        throw new ResponseError(400, 'Please select a image!')

    const candidate = await Cards.findOne({name: cardData.name})

    if (candidate)
        throw new ResponseError(409, 'Card with such name already exists!')

    const card = await new Cards({
        name: cardData.name,
        status: cardData.status,
        type: cardData.type,
        gender: cardData.gender,
        image: config.get('pathToImage') + image.filename,
        locations: cardData.locations,
        episodes: cardData.episodes,
        is_active: true
    })

    await card.save()

    return card
}

exports.DeleteCard = async (id) => {
    try {
        const card = await Cards.findOne({_id: id})

        await card.deleteOne()

        return 'Card deleted!'
    } catch (e) {
        return 'Something went wrong. Try again!'
    }
}

exports.UpdateCard = async (id, dataToUpdate, imageToUpdate) => {
    try {
        const card = await Cards.findOne({_id: id})

        if (!card)
            return 'Card with such name not found!'

        let error
        error = await checkId(dataToUpdate.locations)
        if (error)
            return error

        error = await checkId(dataToUpdate.episodes)
        if (error)
            return error

        if (dataToUpdate.locations && dataToUpdate.locations.length === 0)
            return 'Locations not found'

        if (dataToUpdate.episodes && dataToUpdate.episodes.length === 0)
            return 'Episodes not found'

        card.locations = dataToUpdate.locations
        card.episodes = dataToUpdate.episodes
        card.status = dataToUpdate.status
        card.name = dataToUpdate.name
        card.type = dataToUpdate.type
        card.gender = dataToUpdate.gender
        if (imageToUpdate)
            card.image = config.get('pathToImage') + imageToUpdate.filename

        await card.save()

        return card
    } catch (e) {
        return 'Something went wrong. Try again!'
    }
}

exports.GetAuctions = async () => {
    try {
        const auctions = await Auctions.find({status: true}).populate(['owner', 'card'])
        return await Promise.all(auctions.map(async (auction) => {
            const lastBet = await Bets.findOne({auction: auction._id}, null, {sort: {bet: -1}});
            return {auction, lastBet}
        }))
    } catch (e) {
        return 'Something went wrong. Try again!'
    }
}

exports.Auction = async (auctionData) => {
    try {
        const {
            start_bet, min_step_bet, max_duration_auctions, min_extension_time, max_bet, status,
            card, owner
        } = auctionData

        if (start_bet <= 0)
            return 'The starting bid must be greater than 0'

        if (min_step_bet <= 0)
            return 'The minimum bet step must be greater than 0'

        if (max_bet <= 0)
            return 'The maximum bid must be greater than 0'

        if (max_bet < start_bet)
            return 'The maximum bid cannot be less than the starting bind'

        const newAuction = new Auctions({
            start_bet,
            min_step_bet,
            max_duration_auctions,
            min_extension_time,
            max_bet,
            card,
            owner,
            status,
            end_auction: parseInt(max_duration_auctions) + Date.now()
        })

        await newAuction.save()
        return 'Auction started!'
    } catch (e) {
        return 'Something went wrong. Try again!'
    }
}

exports.Appointment = async (userId, role) => {
    try {
        const user = await Users.findOne({_id: userId})

        user.role = role
        await user.save()

        return 'Successful!'
    } catch (e) {
        return 'Something went wrong. Try again!'
    }
}

exports.GetSets = async () => {
    try {
        return await Sets.find().populate('set')
    } catch (e) {
        return 'Something went wrong. Try again!'
    }
}

exports.CreateSet = async (set_name, newSet, bonus) => {
    try {
        let error
        error = await checkId(newSet)
        if (error)
            return error

        const isExistSet = await Sets.findOne({set_name})
        if (isExistSet) {
            return `Set with name ${set_name} already exists!`
        }

        const setList = await Sets.find()

        for await (const setArr of setList) {
            if (setArr.set.length !== newSet.length)
                break;

            let sa = setArr.set.map(s => s.toString())
            let ns = newSet.map(s => s.toString())

            if (_.isEqual(ns.sort(), sa.sort())) {
                return 'Set with such cards already exists'
            }
        }

        if (bonus <= 0) {
            return `The bonus must be greater than 0`
        }

        if (newSet.length <= 1) {
            return `The set must have greater than 1 card`
        }

        const setToSave = new Sets({set_name, set: newSet, bonus})
        await setToSave.save()

        return `Set ${set_name} created successful`
    } catch (e) {
        return 'Something went wrong. Try again!'
    }
}