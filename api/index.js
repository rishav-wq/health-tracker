const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const multer = require("multer");
const path = require("path");
const bcrypt = require('bcrypt');
const UserModel = require("./models/Schemas");
const HealthRecordModel = require("./models/HealthRecord");

dotenv.config();

const { authenticateUser } = require('./authentication'); 
const app = express();
app.use(express.json());

// CORS configuration
const allowedOrigins = [
    'http://localhost:5173',  // Local development
    'https://health-tracker-vegi.vercel.app', // Deployed frontend
    'https://health-tracker-mauve.vercel.app' // Another possible frontend
];

app.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));


// Session configuration
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true }   // Set secure: true in production with HTTPS
}));

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// MongoDB connection
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
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

// Regular login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email, isSAG: false });
        if (!user) {
            return res.status(404).json({ message: "User not registered" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (match) {
            req.session.userId = user._id;
            res.json({ message: "Login successful" });
        } else {
            res.status(401).json({ message: "Invalid password" });
        }
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

// SAG login route
app.post('/sag-login', (req, res) => {
    const { email, password } = req.body;
    if (authenticateUser(email, password)) {
        res.json({ status: 'SUCCESS', user: { name: 'SAG User' } });
    } else {
        res.status(401).json({ status: 'ERROR', message: 'Invalid credentials' });
    }
});

// Upload documents route
app.post('/upload-documents', upload.fields([
    { name: 'tenthMarksheet', maxCount: 1 },
    { name: 'twelfthMarksheet', maxCount: 1 },
    { name: 'aadharCard', maxCount: 1 }
]), async (req, res) => {
    try {
        const userId = req.session.userId;
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

        user.documents = documentPaths;
        await user.save();

        res.json({ message: 'Documents uploaded successfully', documents: documentPaths });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// Fetch students data route (for SAG users)
app.get('/students', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    UserModel.find({ isSAG: false })
        .then(students => res.json(students))
        .catch(err => res.status(500).json({ message: "Internal server error", error: err.message }));
});

// Logout route
app.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ message: 'Failed to log out' });
            }
            res.json({ message: "Logout successful" });
        });
    } else {
        res.json({ message: "Logout successful" });
    }
});

// Health Records API Endpoints

// Create a new health record
app.post('/health-records', async (req, res) => {
    const { date, bodyTemperature, bloodPressure, heartRate } = req.body;
    
    // Validate health record input
    if (!date || !bodyTemperature || !bloodPressure || !heartRate) {
        return res.status(400).json({ message: "All fields are required." });
    }
    
    try {
        const newHealthRecord = new HealthRecordModel({ date, bodyTemperature, bloodPressure, heartRate });
        await newHealthRecord.save();
        res.status(201).json(newHealthRecord);
    } catch (err) {
        console.error('Error saving health record:', err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

// Retrieve a list of all health records
app.get('/health-records', async (req, res) => {
    try {
        const records = await HealthRecordModel.find();
        res.json(records);
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

// Retrieve a specific health record by its ID
app.get('/health-records/:id', async (req, res) => {
    try {
        const record = await HealthRecordModel.findById(req.params.id);
        if (!record) return res.status(404).json({ message: "Record not found" });
        res.json(record);
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

// Update a health record
app.put('/health-records/:id', async (req, res) => {
    try {
        const updatedRecord = await HealthRecordModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRecord) return res.status(404).json({ message: "Record not found" });
        res.json(updatedRecord);
    } catch (err) {
        res.status(400).json({ message: "Invalid data", error: err.message });
    }
});

// Delete a health record
app.delete('/health-records/:id', async (req, res) => {
    try {
        const deletedRecord = await HealthRecordModel.findByIdAndDelete(req.params.id);
        if (!deletedRecord) return res.status(404).json({ message: "Record not found" });
        res.json({ message: "Record deleted" });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

app.listen(3001, () => {
    console.log("SERVER RUNNING on port 3001!");
});
