const router = require("express").Router();
const artist = require("../models/artist")

router.post("/save", async (req, res) => {
    const newArtist = artist (
        {
            name: req.body.name,
            picture: req.body.picture,
            twitter: req.body.twitter,
            instagram: req.body.instagram,
        }
    )

    try {
        const savedArtist = await newArtist.save();
        return res.status(200).send({
            artist: savedArtist
        })
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error
        })
    }
})

router.get("/getOne/:id", async (req, res) => {
    const filter = {_id : req.params.id}

    const data = await artist.findOne(
        filter
    )

    if (data) {
        return res.status(200).send(
            {
                artist: data
            }
        )
    } else {
        return res.json("Not artist available");
    }
})


router.get("/getAll", async (req, res) => {
    const options = {
        createdAt: -1,
    };

    const data = await artist.find().sort(options);

    if (data) {
        return res.status(200).send(
            {
                artist: data
            }
        )
    } else {
        return res.json("Not all artists available");
    }
})


router.put("/update/:id", async (req, res) => {
    const options = {
        new : true,
        upsert: true,
    }

    const filter = {_id : req.params.id};

    try {
        const result = await artist.findOneAndUpdate(
            filter,
            {
                name: req.body.name,
                picture: req.body.picture,
                twitter: req.body.twitter,
                instagram: req.body.instagram,
            },
            options
        )
        return res.status(200).send({
            message: 'Update Successfully',
            artist: result
        })
    } catch (error) {
        return res.status(400).send("Update failed");
    }
})

router.delete("/delete/:id", async (req, res) => {
    const filter = {_id: req.params.id};

    const result = await artist.deleteOne(filter);

    if (result ) {
        return res.status(200).send({
            message: "Delete Successfully",
            data: result
        });
    } else {
        res.status(400).send("Delete False");
    }
}) 

module.exports = router