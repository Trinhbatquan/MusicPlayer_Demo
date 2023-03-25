# Full Stack Music Player: React, MongoDB, NodeJs (Express), Firebase: Authentication Google + Cloud Storage

### URL: 

https://music-player-41072.web.app

### Tìm hiểu firebase database và storage

Một dịch vụ cơ sở dữ liệu thời gian thực cho phép lưu trữ và đồng bộ dữ liệu giữa các thiết bị và người dùng trong thời gian thực, dữ liệu dạng JSON realtime database ===> đồng bộ dữ liệu trực tiếp client lên server và ngược lại.

Firebase Storage là một dịch vụ lưu trữ tệp, lưu trữ hình ảnh, video, tài liệu,...

### DOTENV

1package của Nodejs app để set env cho biến process.env
===> Sau khi sử dụng, biến process.env sẽ có toàn bộ những env đã define ở file .env và dùng bất cứ đâu trong app.

### TAILWINDCSS

https://tailwindcss.com/docs/guides/create-react-app


### FRAMER MOTION: animation custom

### MOMENT

Format date(createdAt, updatedAt,...) from api

### REACT-ICONS

### AXIOS

### ROUTES TRONG EXPRESS

Phân chia các đối tượng theo từng route
Các bước chính: export moduled, require vào app.js, use ở app.js với đường dẫn hợp lý.


### TOKEN VÀ VALIDATE REQUEST DATA VỚI TOKEN

Firebase SDK là một bộ thư viện máy chủ cho phép tương tác với firebase từ môi trường máy chủ backend (nodejs, java, go,...) dưới vai trò là một quản trị viên.

Firestore của firebase cho phép client trực tiếp truy cập thông qua native sdks. Tuy nhiên, mặc định firebase cho phép bất cứ user nào cũng .read, .write trên firestore của bạn ===> Cần có cơ chế validate dữ liệu và phân quyền

Như vậy thì client sẽ giao tiếp với server custom, server giao tiếp với firebase qua SDK sau đó gửi response về cho client dạng json.

Nhưng server phải biết hiện tại người gửi request là ai, có những quyền gì với firebase, điều này đã được thể hiện rõ qua token mà firebase gửi cho client khi xác thực ===> Validate token để xác định tính toàn vẹn và xác định các quyền mà user đó được làm với firebase.

Như vậy khi client gửi request + token lên server, server kết nối firebase qua SDK để biết được token hiện tại, đối chiếu với token mà client gửi tới ===>nếu oke, gửi response và decode (giải mã) token và gửi lại client thông tin chi tiết của user đang đăng nhập.


### MONGODB

MongoDB là một database cho phép lưu trữ các document với cấu trúc rộng dưới dạng JSON, các document này được lưu bên trong một collection.

Mongoose là một thư viện mô hình hoá đối tượng cho MongoDB và NodeJs, một thư viện JavaScript cho phép định nghĩa các schema với dữ liệu được định kiểu rõ ràng.
NodeJs -------> Mongoose ---> Mongo driver ------> mongoDB
Khi khởi tạo 1 model schema, lưu data vào model đó và .save() thì trong mongoDB sẽ có data của model đó. Client đăng nhập ===> server dùng firebase admin verify ====>Oke thì tạo 1 schema mới ===> lưu vào mongoDB qua mongoose.
===> MongoDB có data của user đăng nhập

### CHỨC NĂNG CHÍNH
- Đăng nhập google và validate token

- Play, stop, prev, next,...

- Thêm, sửa, xoá bài hát, tác giả, album

-Cập nhật bài hát, tác giả, album, thông tin người dùng

-Lưu trữ, cập nhật data qua mongoDB và Storage Firebase

### THANK FOR WATCHING!!!



