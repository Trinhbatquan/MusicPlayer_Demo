const router = require("express").Router();
const album = require('../models/album')

router.post("/save", async (req, res) => {
    const newAlbum = album (
        {
            name: req.body.name,
            picture: req.body.picture,
        }
    )

    try {
        const saveAlbum = await newAlbum.save();
        return res.status(200).send({
            album: saveAlbum
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

    const data = await album.findOne(
        filter
    )

    if (data) {
        return res.status(200).send(
            {
                album: data
            }
        )
    } else {
        return res.json("Not album available");
    }
})

router.get("/getAll", async (req, res) => {
    const options = {
        createdAt: -1,
    };

    const data = await album.find().sort(options);

    if (data) {
        return res.status(200).send(
            {
                album : data
            }
        )
    } else {
        return res.json("Not all albums available");
    }
})

router.put("/update/:id", async (req, res) => {
    const options = {
        new : true,
        upsert: true,
    }

    const filter = {_id : req.params.id};

    try {
        const result = await album.findOneAndUpdate(
            filter,
            {
                name: req.body.name,
                picture: req.body.picture,
            },
            options
        )
        return res.status(200).send({
            message: 'Update Successfully',
            album: result
        })
    } catch (error) {
        return res.status(400).send("Update failed");
    }
})

router.delete("/delete/:id", async (req, res) => {
    const filter = {_id: req.params.id};

    const result = await album.deleteOne(filter);

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