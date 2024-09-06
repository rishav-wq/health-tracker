const multer = require('multer');
const path = require('path');
const upload = require('./upload'); 

// Set up storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Set the destination folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Set the filename
    }
});

// Initialize upload middleware
const upload = multer({ storage });

module.exports = upload;
