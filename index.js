const express = require("express");
const app = express();
require("dotenv/config")
const {default : mongoose} = require("mongoose")
/* 
    express là một framework của Nodejs dùng để cấu trúc và code các dự
    án back-end
    B1: requirement statements: cái đặt các express module  và require để 
    load những module đó.
*/ 

const cors = require('cors');
app.use(cors({origin: true}));
/*
    cors: cho phép chia sẻ tài nguyên chéo, một custom để quy định việc
    truy cập tài nguyên của các domain khác để lấy api từ web của bạn
    khi không được phép.

    khi client gửi request thì gắn thêm 1 cors là origin vào headers,
    server nó sẽ kiểm tra xem cái origin này có được lấy api của server đó hay k
    Trường hợp * là tất cả các domain đều lấy dc api, server sẽ trả về res là 
    Access - Control - Allow - Origin: *

    nếu lỗi thì bắn error ở client try-catch: same origin policy
*/
app.use(express.json());
//thêm một phần mềm trung gian mới, ở đây là express.js phân tích cú pháp yêu cầu JSON
//đến và đưa vào body của request 

app.get("/", (req, res) => {
    return res.json("hello express nodejs")
})
/*
    gửi response đến front-end web
*/


mongoose.connect(process.env.DB_STRING, {useNewUrlParser  : true});
mongoose.connection
.once("open", () => console.log("connected"))
.on("error", (error) => {
    console.log(`ERROR : ${error}`);
})
/*
connect với mongoDB từ mongoose.
*/


/*
route user authentication and validate token from client by firebase SDK
*/
const userRoute = require('./routes/auth')
app.use("/api/users", userRoute)

// Artist Routes
const artistsRoutes = require('./routes/artist')
app.use("/api/artists/", artistsRoutes);

//Album Routes
const albumRoutes = require('./routes/album')
app.use("/api/albums/", albumRoutes);

//Song Routes
const songRoutes = require('./routes/song')
app.use("/api/songs/", songRoutes);


app.listen(4000, () => {
    console.log("Running backend on port 4000")
})
/*
    khai báo cổng mặc định chạy web
*/


// Export the Express API
// module.exports = app;