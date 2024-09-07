const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const multer = require("multer");
const path = require("path");
const bcrypt = require('bcrypt');
const UserModel = require("./models/Schemas"); // Ensure this model is correctly defined

dotenv.config();

const { authenticateUser } = require('./authentication'); 
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

// Multer setup for file uploads
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

// User registration route
app.post('/register', async (req, res) => {
    const { name, email, password, isSAG } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword, isSAG });
        await newUser.save();
        res.json("User registered successfully");
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});
// Regular login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(`Login attempt - Email: ${email}, Password: ${password}`); // Debug log
    try {
        const user = await UserModel.findOne({ email: email, isSAG: false });
        console.log('Found user:', user); // Debug log
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                req.session.userId = user._id; // Set session ID
                res.json("SUCCESS!!!");
            } else {
                res.json("WRONG!!!");
            }
        } else {
            res.json("NOT REGISTERED USER!!");
        }
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

// SAG login route
// Example backend response handling
app.post('/sag-login', (req, res) => {
    const { email, password } = req.body;
  
    // Authenticate user
    if (authenticateUser(email, password)) {
      res.json({ status: 'SUCCESS', user: { name: 'SAG User' } });
    } else {
      res.json({ status: 'ERROR', message: 'Invalid credentials' });
    }
  });
  
// Upload documents route
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

// Fetch students data route (for SAG users)
app.get('/students', (req, res) => {
    // Ensure SAG user is authenticated
    if (!req.session.userId) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    UserModel.find({ isSAG: false }) // Fetch student data
        .then(students => {
            res.json(students);
        })
        .catch(err => res.status(500).json({ message: "Internal server error", error: err.message }));
});

// Logout route
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
