import React, { useState } from 'react';
import AddHealthRecord from './AddHealthRecord';

const HealthRecords = () => {
  const [records, setRecords] = useState([]);

  const handleRecordAdded = (newRecord) => {
    // Update the state with the new record
    setRecords((prevRecords) => [...prevRecords, newRecord]);
  };

  return (
    <div>
      <h1>Health Records</h1>
      <AddHealthRecord onRecordAdded={handleRecordAdded} />
      {/* Optionally render existing records */}
      <div>
        <h2>Existing Records</h2>
        <ul>
          {records.map((record) => (
            <li key={record._id}>
              {record.date}: {record.bodyTemperature}°C, {record.bloodPressure}, {record.heartRate} bpm
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HealthRecords;
