const mongoose = require("mongoose");

const albumSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        picture: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("album", albumSchema);