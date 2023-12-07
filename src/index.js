// require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/db.js');

app.use(express.json());

//requirement
const audioNativeRoutes = require('./routes/native.js');
const categoryRoutes = require('./routes/category.js')
const itemsRoutes = require('./routes/items');
const middlewareLogRequest =require('./middleware/logs.js');

//middleware
app.use(middlewareLogRequest);

// endpoint
//items
app.use('/api', itemsRoutes);

// category
app.use('/category', categoryRoutes);




app.listen(4000, () =>{
    console.log(`Server berhasil di running di  http://localhost:4000`);
});


// // audio native
// app.use('/native', audioNativeRoutes);
// // category
// app.use('/category-name', categoryRoutes);
