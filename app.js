const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const keys = require('./vercel.json')
const cors = require("cors");
const bodyParser = require('body-parser')
const Auctions = require('./models/Auctions')
const Bets = require('./models/Bets')
const Users = require('./models/Users')
const Cards = require('./models/Cards')
const CronJob = require('cron').CronJob;
const _ = require('lodash')
const calculate = require('./helpers/calculateRating')

const app = express();

const PORT = process.env.PORT || 5000

app.use(express.static('./public'))

app.use(bodyParser.json())
app.use(cors())

const adminRouter = require('./Routes/adminRouter');
const authRouter = require("./Routes/authRouter");
const userRouter = require("./Routes/userRouter");

app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);

const checkAuctions = async() => {
    try {
        const getCloseAuctions = await Auctions.find({ status: true, end_auction: { $lte: Date.now() } })
        if (!getCloseAuctions) {
            console.error('Opened auctions not found')
        }

        for (let auction of getCloseAuctions) {
            auction.status = false
            await auction.save();

            const cardId = auction.card
            const lastBid = await Bets.findOne({ auction: auction._id }, {}, { sort: { 'bet': -1 } })
            if (lastBid) {

                const userId = lastBid.user
                const owner = await Users.findOne({ _id: auction.owner })
                let card = await Cards.findOne({ _id: cardId })
                const user = await Users.findOne({ _id: userId })

                if (owner && user) {
                    switch (owner.role) {
                        case "Admin":
                            {

                                user.cards.push(cardId)

                                const calculateUser = await calculate(user.cards.map(card => card.toString()))
                                user.sets = calculateUser.userSets
                                user.rating = calculateUser.userRating

                                if (!card.is_active) {
                                    card.is_active = true
                                    await card.save()
                                }

                                await user.save()
                                await auction.save()
                                break;
                            }
                        case "User":
                            {
                                const findCardIndex = owner.cards.findIndex((card) => card._id === card)
                                owner.cards = owner.cards.filter((_, index) => index !== findCardIndex) // Owner cardId delete by cardId index

                                user.cards.push(cardId) // user add cardId by cardId

                                const calculateOwner = await calculate(owner.cards.map(card => card.toString()))
                                owner.sets = calculateOwner.userSets
                                owner.rating = calculateOwner.userRating
                                owner.balance += lastBid.bet;

                                const calculateUser = await calculate(user.cards.map(card => card.toString()))
                                user.sets = calculateUser.userSets
                                user.balance -= lastBid.bet;
                                user.rating = calculateUser.userRating

                                if (!card.is_active) {
                                    card.is_active = true
                                    await card.save()
                                }

                                await owner.save();
                                await user.save();
                                break;
                            }
                    }
                }
            }
        }
    } catch (e) {
        console.log(e)
    }
}

const job = new CronJob('* * * * * *', async function() {
    await checkAuctions()
}, null, true, 'America/Los_Angeles');

const calculateRating = new CronJob('0 0 * * *', async function() {
    const users = await Users.find()
    for (const user of users) {
        const calculateUser = await calculate(user.cards.map(card => card.toString()))
        user.sets = calculateUser.userSets
        user.rating = calculateUser.userRating
    }
}, null, true, 'America/Los_Angeles');


async function start() {
    try {
        await mongoose.connect(keys.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        job.start();
        calculateRating.start()
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start();