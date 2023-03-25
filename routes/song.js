const router = require("express").Router();
const song = require("../models/song")

router.post("/save", async (req, res) => {
    const newSong = song (
        {
            name: req.body.name,
            picture: req.body.picture,
            songURL: req.body.songURL,
            album: req.body.album,
            artist: req.body.artist,
            language: req.body.language,
            category: req.body.category
        }
    )
    // return res.json(newSong);

    try {
        const savedSong = await newSong.save();
        return res.status(200).send({
            song: savedSong
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

    const data = await song.findOne(
        filter
    )

    if (data) {
        return res.status(200).send(
            {
                song: data
            }
        )
    } else {
        return res.json("Not song available");
    }
})

router.get("/getAll", async (req, res) => {
    const options = {
        createdAt: -1,
    };

    const data = await song.find().sort(options);

    if (data) {
        return res.status(200).send(
            {
                song : data
            }
        )
    } else {
        return res.json("Not all songs available");
    }
})


router.put("/update/:id", async (req, res) => {
    const options = {
        new : true,
        upsert: true,
    }

    const filter = {_id : req.params.id};

    try {
        const result = await song.findOneAndUpdate(
            filter,
            {
                name: req.body.name,
                picture: req.body.picture,
                songURL: req.body.songURL,
                album: req.body.album,
                artist: req.body.artist,
                language: req.body.language,
                category: req.body.category
            },
            options
        )
        return res.status(200).send({
            message: 'Update Successfully',
            song: result
        })
    } catch (error) {
        return res.status(400).send("Update failed");
    }
})

router.delete("/delete/:id", async (req, res) => {
    const filter = {_id: req.params.id};

    const result = await song.deleteOne(filter);

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