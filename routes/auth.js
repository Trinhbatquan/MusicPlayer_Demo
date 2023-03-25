const router = require("express").Router();
//Khởi tạo một đối tượng Router

const admin = require("../config/firebase.config")
//firebase admin sdk

const user = require("../models/user")

// token firebase: name, picture, user_id, email,.. là những thằng
//k thay đổi sau mỗi lần signOut và login lại vì nó là phần
//payload trong token của firebase

router.get("/login", async (req, res) => {
    //get token from client header request
    if (!req.headers.authorization) {
        //viết chữ thường với props
        return res.status(500).send({
            message: "invalid authorization token"
        })
    }
    const token = req.headers.authorization.split(" ")[1];

    //validate token from client by firebase sdk (firebase-admin sdk)
    try {
        const decodeValue = await admin.auth().verifyIdToken(token);
        // return res.send(decodeValue)
        if (!decodeValue) {
            return res.status(505).json({
                message: "un authorized"
            })
        } else {
            // const userExists = await user.find({
            //     "user_id" : decodeValue.user_id
            // });
            await user.findOne({"user_id" : decodeValue.user_id}). then ((userExists) => {
                if (!userExists) {
                    newUserData(decodeValue, req, res);
                } else {
                     updateUserData(decodeValue, req, res)
                }
            })
        }

    } catch (error) {
        return res.status(505).json({
            message: error
        })
    }
})

const newUserData = async (decodeValue, req, res) => {
    const newUser = new user({
        name: decodeValue.name,
        email: decodeValue.email,
        picture: decodeValue.picture,
        user_id: decodeValue.user_id,
        email_verified: decodeValue.email_verified,
        role: "admin",
        auth_time: decodeValue.auth_time, 
    })

    try {
        //lưu trên mongoDB và gửi res về client
        const savedUser = await newUser.save();
        res.status(200).send({
            user: savedUser
        })

    } catch (error) {
        res.status(400).send({
            success: false, 
            massage: error
        })
    }
}

const updateUserData = async (decodeValue, req, res) => {
    const filter = {"user_id" : decodeValue.user_id}
    const update = {"auth_time" : 'updated'}
    const options = {
        new : true,
        upsert: true,
    }

    try {
        const updateUser = await user.findOneAndUpdate(
            filter,
            update,
            options
        );
        res.status(200).send({user: updateUser})

    }catch (error) {
        res.status(400).send({
            success: false,
            message: error
        })
    }
}

router.get("/getAll", async (req, res) => {
    const options = {
        createdAt: 1,
    };
     const data = await user.find().sort(options);

     if (data) {
        res.status(200).send({
            users: data
        })
     } else {
        res.status(400).send("No get user from database");
     }
})

router.put("/updateRole/:userId", async(req, res) => {
    const filter = {user_id: req.params.userId}
    // return res.send(req.body.role);
    const role = req.body.role;
    const update = {role : role}

    // const options = {
    //     new : true
    // }

    try {
         const result = await user.findOneAndUpdate(filter, update);

         if (result) {
            res.status(200).send({
                user: result
            }) 
         }
    } catch (error) {
         res.status(400).send("Not update role for user");
    }
})

router.delete("/delete/:userId", async(req, res) => {
    const filter = {user_id : req.params.userId}

    const result = await user.deleteOne(filter);

    if(result.deletedCount === 1) {
        res.status(200).send({
            message: "Delete User Successfully"
        })
    } else {
        res.status(400).send({
            message: "Delete User Failed"
        })
    }
})


module.exports = router;
