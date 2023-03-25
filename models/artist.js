const mongoose = require("mongoose");

const artistSchema = mongoose.Schema(
    {
        name : {
            type: String,
            required: true,
        },
        picture: {
            type: String,
            required: true
        },
        twitter: {
            type: String,
            required: true
        },
        instagram: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("artist", artistSchema);