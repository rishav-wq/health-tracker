const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const multer = require("multer");
const path = require("path");
const UserModel = require("./models/Schemas");

dotenv.config();

const app = express();
app.use(express.json());

// CORS configuration
app.use(cors({
    origin: "http://localhost:5173", // Update with your React app URL
    credentials: true
}));

// Session configuration
app.use(session({
    secret: process.env.SECRET_KEY, // Replace with an actual secret key from environment variables
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true }   // Set secure: true in production with HTTPS
}));
// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Set your desired destination folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to file name
    }
});

const upload = multer({ storage: storage });


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    req.session.userId = user._id; // Set session ID
                    res.json("SUCCESS!!!");
                } else {
                    res.json("WRONG!!!");
                }
            } else {
                res.json("NOT REGISTERED USER!!");
            }
        })
        .catch(err => res.status(500).json({ message: "Internal server error", error: err.message }));
});

app.post('/upload-documents', upload.fields([
    { name: 'tenthMarksheet', maxCount: 1 },
    { name: 'twelfthMarksheet', maxCount: 1 },
    { name: 'aadharCard', maxCount: 1 }
]), async (req, res) => {
    try {
        const userId = req.session.userId; // Get user ID from session

        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const documentPaths = {
            tenthMarksheet: req.files['tenthMarksheet'] ? req.files['tenthMarksheet'][0].path : user.documents.tenthMarksheet,
            twelfthMarksheet: req.files['twelfthMarksheet'] ? req.files['twelfthMarksheet'][0].path : user.documents.twelfthMarksheet,
            aadharCard: req.files['aadharCard'] ? req.files['aadharCard'][0].path : user.documents.aadharCard,
        };

        // Update the user's documents field
        user.documents = documentPaths;
        await user.save();

        res.json({ message: 'Documents uploaded successfully', documents: documentPaths });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

app.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy((err) => { // Destroy session
            if (err) {
                return res.status(500).json({ error: 'Failed to log out' });
            }
            res.json({ message: "Logout successful", redirect: "/login" }); // Send JSON response
        });
    } else {
        res.json({ message: "Logout successful", redirect: "/login" }); // If no session
    }
});

app.listen(3001, () => {
    console.log("SERVER RUNNING on port 3001!");
});
