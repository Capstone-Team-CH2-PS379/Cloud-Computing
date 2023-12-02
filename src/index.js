const express = require('express');
const app = express();
const audioRoutes = require('./routes/audio.js');
const middlewareLogRequest = require('./middleware/logs.js');
const { upload, handleFileUpload } = require('./middleware/multer.js');

app.use(middlewareLogRequest);

app.use('/audio', audioRoutes);


app.use((err, req, res, next)=>{
    res.json({
        message: err.message
    })
})
app.listen(4000, () =>{
    console.log('Server berhasil di running di port http://localhost:4000');
})
