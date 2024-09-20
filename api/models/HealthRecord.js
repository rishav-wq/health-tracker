const mongoose = require('mongoose');

const HealthRecordSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    bodyTemperature: { type: Number, required: true },
    bloodPressure: { type: String, required: true },
    heartRate: { type: Number, required: true }
}, { timestamps: true });

const HealthRecordModel = mongoose.model('HealthRecord', HealthRecordSchema);
module.exports = HealthRecordModel;
