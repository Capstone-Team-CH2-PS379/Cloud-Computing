# FluentIn

## _Aplikasi Belajar berbicara bahasa asing_
[![made-with-javascript](https://img.shields.io/badge/Made%20with-JavaScript-1f425f.svg)](https://www.javascript.com)
[![Github all releases](https://img.shields.io/github/downloads/Naereen/StrapDown.js/total.svg)](https://GitHub.com/Naereen/StrapDown.js/releases/)
	![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white)

## Features back-end
- Memproses register dan login
- Memproses file audio
- Menghubungkan dengan Google cloud computing
- Menyimpan model Machine Learning di aplikasi/cloud
- Menggunakan Model Machine Learning
- Membuat API untuk fitur voice channel Real Time


## Memulai Project
[![Npm package version](https://badgen.net/npm/v/express)](https://npmjs.com/package/express) 	![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) [![git](https://badgen.net/badge/icon/git?icon=git&label)](https://git-scm.com)
1. Clone Repositori ini dengan menjalankan perintah ini di cmd/ terminal
```sh
    git clone https://github.com/Capstone-Team-CH2-PS379/Cloud-Computing.git
```
2. masuk ke folder
```sh
    cd Cloud-Computing
```
3. menginisalisai proyek dan install express js dan nodemon

```sh
    npm init -y
    npm install express nodemon dotenv mysql2 bcrypt jsonwebtoken joi multer @google-cloud/storage
```
4. pastikan pada package.json terdapat
```sh
....
    "scripts": {
        "start": "nodemon src/index.js",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
....
```
5. sekrang server bisa di jalankan dengan perintah
```sh
    npm run start
```

## Penjelasan Struktur Folder
- [src] - Kode Utama
Folder utama yang berisi semua kode aplikasi.

- [routes] - Rute Aplikasi
Folder untuk menangani rute atau endpoint aplikasi.

- [controller] - Logika Aplikasi
Fungsi-fungsi yang menangani logika inti aplikasi.

- [middleware] - Modul Penengah
Fungsi-fungsi untuk memproses permintaan sebelum sampai ke pengendali.

- [models] - Model dan Database
Fungsi-fungsi terkait model data dan akses ke database.

- [config] - Konfigurasi
File-file konfigurasi untuk mengatur aplikasi.

[![Open Source? Yes!](https://badgen.net/badge/Open%20Source%20%3F/Yes%21/blue?icon=github)](https://github.com/Naereen/badges/)
