const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    adult: {
        type: Boolean,
    },
    backdrop_path: {
        type: String
    },
    id: {
        type: Number
    },
    original_language:{
        type: String
    },
    original_title:{
        type: String
    },
    overview:{
        type: String
    },
    title:{
        type: String,
    },
})