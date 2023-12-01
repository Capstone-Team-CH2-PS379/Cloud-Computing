const express = require('express');
const app = express();

const usersRoutes = require('./routes/audio.js');
const middlewareLogRequest = require('./middleware/logs.js');
const { upload, handleFileUpload } = require('./middleware/multer.js');

app.use(middlewareLogRequest);

//fungsi endpint untuk mengunggah file audio
app.post('/upload-audio', upload.single('audio'), handleFileUpload, (req, res)=>{
    try {
         //dapatkan informasi file yang di unggah
        const uploadedFile = req.file;
        res.json({
            message: 'Upload Berhasil',
            fileUrl: uploadedFile.cloudStoragePublicUrl,
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
          message: 'Gagal mengunggah file audio',
        });
    }

});

app.use((err, req, res, next)=>{
    res.json({
        message: err.message
    })
})
app.listen(4000, () =>{
    console.log('Server berhasil di running di port http://localhost:4000');
})
