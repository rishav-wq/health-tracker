const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    documents: {
        tenthMarksheet: { type: String }, // Store file paths or URLs
        twelfthMarksheet: { type: String },
        aadharCard: { type: String },
    },
    createdAt: { type: Date, default: Date.now },
});

const ApplicationModel = mongoose.model("Application", ApplicationSchema);
module.exports = ApplicationModel;
