const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { error } = require('console');
const router = express.Router();

// multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// upload route
router.post('/upload', upload.single('file'), (req, res) => {
    res.json({ filename: req.file.filename, path: `/uploads/${req.file.filename}`});
});

// get list of files
router.get('/files', (req, res) => {
    fs.readdir('./uploads', (err, files) => {
        if (err) return res.status(500).json({ error: err });
        res.json(files);
    });
});

// delete file
router.delete('/delete/:filename', (req, res) => {
    const filePath = path.join(__dirname, '../uploads', res.params.filename);
    fs.unlink(filePath, err => {
        if(err) return res.status(500).json({ error: 'File not found' });
        res.json({ message: 'File deleted' });
    });
});

module.exports = router;