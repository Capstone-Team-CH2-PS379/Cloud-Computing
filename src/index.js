// require('dotenv').config();
const express = require('express');
const app = express();


app.use(express.json());

const audioNativeRoutes = require('./routes/native.js');
const categoryRoutes = require('./routes/category.js');


app.use("/", (req, res, next)=>{
    res.send('Selamat Server berhasil berjalan');
})

// audio native
app.use('/native', audioNativeRoutes);
// category
app.use('/category-name', categoryRoutes);

app.listen(4000, () =>{
    console.log(`Server berhasil di running di  http://localhost:4000`);
});
