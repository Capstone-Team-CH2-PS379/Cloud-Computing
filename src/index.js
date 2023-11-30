const express = require('express');
const app = express();

app.use("/", (req, res, next)=>{
    res.send('Selamat Server berhasil berjalan');
})

app.listen(4000, () =>{
    console.log('Server berhasil di running di port http://localhost:4000');
})
