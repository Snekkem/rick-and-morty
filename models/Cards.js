const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    name: {type: String},
    status: {type: String, enum: ['Alive', 'Dead', 'unknown']},
    type: {type: String},
    gender: {type: String, enum: ['Female', 'Male', 'Genderless', 'unknown']},
    locations: [{type: Schema.Types.ObjectId, ref:'locations'}],
    episodes: [{type: Schema.Types.ObjectId, ref:'episodes'}],
    image: {type: String},
    is_active: {type: Boolean, default: false},
    created_at: {type: Date, default: new Date().toISOString()}
})

module.exports = mongoose.model('cards', schema)