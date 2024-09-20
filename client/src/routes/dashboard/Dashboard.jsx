import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./dashboard.scss";

function Dashboard() {
  const [showHealthData, setShowHealthData] = useState(false);
  const healthRecords = [
    { id: 1, date: "September 20, 2024", bodyTemperature: "98.6°F", bloodPressure: "120/80 mmHg", heartRate: "72 bpm" },
    { id: 2, date: "September 19, 2024", bodyTemperature: "98.7°F", bloodPressure: "118/76 mmHg", heartRate: "75 bpm" },
    { id: 3, date: "September 18, 2024", bodyTemperature: "99.1°F", bloodPressure: "115/75 mmHg", heartRate: "70 bpm" },
  ];

  const handleHealthDataClick = () => {
    setShowHealthData(!showHealthData);
  };

  return (
    <div className="dashboard">
      {/* Health Metrics Section */}
      <section className="health-metrics-section">
        <h2>Health Metrics</h2>
        <div className="health-metrics-cards">
          <div className="health-metric-card" onClick={handleHealthDataClick}>
            <h3>Latest Health Record</h3>
            <p>Date: September 20, 2024</p>
            <p>Body Temperature: 98.6°F</p>
            <p>Blood Pressure: 120/80 mmHg</p>
            <p>Heart Rate: 72 bpm</p>
            {showHealthData && (
              <div className="health-data-details">
                <h4>Health Data History</h4>
                {healthRecords.map(record => (
                  <div key={record.id} className="data-entry">
                    <Link to={`/health-records/${record.id}`}> {/* Link to Health Record Detail */}
                      <h5>Entry on {record.date}</h5>
                    </Link>
                    <p>Body Temperature: {record.bodyTemperature}</p>
                    <p>Blood Pressure: {record.bloodPressure}</p>
                    <p>Heart Rate: {record.heartRate}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="health-metric-card">
            <h3>Overall Health Status</h3>
            <p>Good</p>
          </div>
        </div>
      </section>

      {/* User Details Section */}
      <section className="user-details-section">
        <h2>Your Profile</h2>
        <div className="user-info">
          <img
            src="https://via.placeholder.com/150"
            alt="User Profile"
            className="user-profile-pic"
          />
          <div className="user-details">
            <h3>John Doe</h3>
            <p>Email: johndoe@example.com</p>
            <p>Contact: +123 456 7890</p>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="download-section">
        <h2>Download Your Health Records</h2>
        <button className="download-btn">
          <i className="fas fa-download"></i> Download Records
        </button>
      </section>

      {/* Add New Record Section */}
      <section className="add-record-section">
        <h2>Want to Add a New Health Record?</h2>
        <Link to="/health-records">
          <button className="add-record-btn">Add Record</button>
        </Link>
      </section>
    </div>
  );
}

export default Dashboard;
