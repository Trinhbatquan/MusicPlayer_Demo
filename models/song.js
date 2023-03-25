const mongoose = require("mongoose");

const songSchema = mongoose.Schema(
    {
        name : {
            type: String,
            required: true,
        },
        picture: {
            type: String,
            required: true
        },
        songURL : {
            type: String,
            required: true
        },
        album: {
            type: String,
            required: true
        },
        artist : {
            type: String,
            required: true
        },
        language : {
            type: String,
            required: true
        },
        category : {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("song", songSchema);