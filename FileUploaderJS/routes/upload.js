const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// File upload route
router.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    // Send response with file information
    res.json({
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`,
      message: 'File uploaded successfully.',
    });
  } else {
    res.status(400).json({ error: 'No file uploaded' });
  }
});

// Get the list of uploaded files
router.get('/files', (req, res) => {
  fs.readdir('./uploads', (err, files) => {
    if (err) return res.status(500).json({ error: err });
    res.json(files);
  });
});

// Delete a file route
router.delete('/delete/:filename', (req, res) => {
  const filePath = path.join(__dirname, '../uploads', req.params.filename);
  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).json({ error: 'File not found' });
    res.json({ message: 'File deleted' });
  });
});

module.exports = router;