// require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json()); //untuk parsing JSON

//requirement
const audioNativeRoutes = require("./routes/native.js");
const categoryRoutes = require("./routes/category.js");
const usersRoutes = require("./routes/users.js");
const audioRecord = require("./routes/record.js");
// requirement middleware
const middlewareLogRequest = require("./middleware/logs.js");
const middlewareToken = require("./middleware/verifyToken.js");

//cors
app.use(cors());

//middleware
app.use(middlewareLogRequest);

// endpoint
//user
app.use("/users", usersRoutes);

// category
app.use("/category", middlewareToken, categoryRoutes);

// audio native (ingat tambahkan teks translate)
app.use("/native", audioNativeRoutes);  //tambahkan middlewareToken supaya mengecek  token

// recordings audio
app.use("/record", audioRecord);


app.listen(4000, () => {
  console.log(`Server berhasil di running di  http://localhost:4000`);
});
