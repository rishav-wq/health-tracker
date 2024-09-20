import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './HealthRecordDetail.scss';

const HealthRecordDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedRecord, setUpdatedRecord] = useState({
    temperature: '',
    bloodPressure: '',
    heartRate: ''
  });

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await axios.get(`/health-records/${id}`);
        setRecord(response.data);
        setUpdatedRecord({
          temperature: response.data.temperature || '',
          bloodPressure: response.data.bloodPressure || '',
          heartRate: response.data.heartRate || ''
        });
      } catch (error) {
        console.error('Error fetching record:', error);
        alert("Failed to load health record.");
      }
    };
    fetchRecord();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this health record?")) {
      try {
        await axios.delete(`/health-records/${id}`);
        alert("Health record deleted successfully!");
        navigate("/"); // Redirect after deletion
      } catch (error) {
        console.error(error);
        alert("Failed to delete health record.");
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/health-records/${id}`, updatedRecord);
      setRecord(response.data); // Update state with the new record data
      setIsEditing(false);
      alert("Health record updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update health record.");
    }
  };

  if (!record) return <p>Loading...</p>;

  return (
    <div className="health-record-detail">
      <h2>Health Record Detail</h2>
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={updatedRecord.temperature}
            onChange={(e) => setUpdatedRecord({ ...updatedRecord, temperature: e.target.value })}
            placeholder="Body Temperature"
            required
          />
          <input
            type="text"
            value={updatedRecord.bloodPressure}
            onChange={(e) => setUpdatedRecord({ ...updatedRecord, bloodPressure: e.target.value })}
            placeholder="Blood Pressure"
            required
          />
          <input
            type="text"
            value={updatedRecord.heartRate}
            onChange={(e) => setUpdatedRecord({ ...updatedRecord, heartRate: e.target.value })}
            placeholder="Heart Rate"
            required
          />
          <button type="submit">Update</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div className="record-info">
          <p>Date: {record.date}</p>
          <p>Body Temperature: {record.temperature} °C</p>
          <p>Blood Pressure: {record.bloodPressure}</p>
          <p>Heart Rate: {record.heartRate} BPM</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default HealthRecordDetail;
