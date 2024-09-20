import React, { useState } from "react";
import axios from "axios";
import './AddHealthRecord.scss';

const AddHealthRecord = ({ onRecordAdded }) => {
  const [newRecord, setNewRecord] = useState({
    date: '',
    temperature: '',
    bloodPressure: '',
    heartRate: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRecord({ ...newRecord, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Input validation
    if (!newRecord.date || !newRecord.temperature || !newRecord.bloodPressure || !newRecord.heartRate) {
      setError('Please fill in all fields.');
      return;
    }

    const recordData = {
      date: new Date(newRecord.date),
      bodyTemperature: parseFloat(newRecord.temperature),
      bloodPressure: newRecord.bloodPressure,
      heartRate: parseInt(newRecord.heartRate)
    };

    try {
      const response = await axios.post('http://localhost:3001/health-records', recordData);
      alert("Health record added successfully!");

      // Call the onRecordAdded function with the new record
      onRecordAdded(response.data); // Assuming the server responds with the new record

      setNewRecord({ date: '', temperature: '', bloodPressure: '', heartRate: '' }); // Reset form
    } catch (error) {
      console.error('Error adding record:', error);
      console.log('Error Response:', error.response);
      setError("Failed to add health record: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="add-health-record">
      <h2>Add Health Record</h2>
      {error && <div className="error-message">{String(error)}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="date"
          value={newRecord.date}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="temperature"
          value={newRecord.temperature}
          onChange={handleChange}
          placeholder="Body Temperature"
          required
        />
        <input
          type="text"
          name="bloodPressure"
          value={newRecord.bloodPressure}
          onChange={handleChange}
          placeholder="Blood Pressure (e.g., 120/80)"
          required
        />
        <input
          type="number"
          name="heartRate"
          value={newRecord.heartRate}
          onChange={handleChange}
          placeholder="Heart Rate"
          required
        />
        <button type="submit">Add Record</button>
      </form>
    </div>
  );
};

export default AddHealthRecord;
