// require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());//untuk parsing JSON

//requirement
const audioNativeRoutes = require('./routes/native.js');
const categoryRoutes = require('./routes/category.js')
const usersRoutes = require('./routes/users.js');

// requirement middleware
const middlewareLogRequest =require('./middleware/logs.js');
const middlewareToken = require('./middleware/verifyToken.js')

//requirement Fitur
// const authRoutes = require('./routes/auth.js');


//middleware
app.use(middlewareLogRequest);


// endpoint
//user
app.use('/users', usersRoutes);

// category
app.use('/category',middlewareToken, categoryRoutes);

// audio native
app.use('/native',middlewareToken,  audioNativeRoutes);


//fitur

app.listen(4000, () =>{
    console.log(`Server berhasil di running di  http://localhost:4000`);
});
