import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./dashboard.scss";

function Dashboard() {
  const [showVerificationStages, setShowVerificationStages] = useState(false);

  const handleStatusClick = () => {
    setShowVerificationStages(!showVerificationStages);
  };

  return (
    <div className="dashboard">
      {/* Status Section */}
      <section className="status-section">
        <h2>Current Status</h2>
        <div className="status-cards">
          <div className="status-card" onClick={handleStatusClick}>
            <h3>Application Status</h3>
            <p>In Progress</p>
            <progress value="70" max="100"></progress>
            {showVerificationStages && (
              <div className="verification-stages">
                <div className="stage">
                  <h4>Step 1: Document Submission</h4>
                  <p>Status: Completed ✅</p>
                </div>
                <div className="stage">
                  <h4>Step 2: Initial Screening</h4>
                  <p>Status: In Progress ⏳</p>
                  <progress value="50" max="100"></progress>
                </div>
                <div className="stage">
                  <h4>Step 3: Institute Verification</h4>
                  <p>Status: Pending 🔄</p>
                </div>
                <div className="stage">
                  <h4>Step 4: Final Approval</h4>
                  <p>Status: Pending 🔄</p>
                </div>
              </div>
            )}
          </div>

          <div className="status-card">
            <h3>Verification Status</h3>
            <p>Pending</p>
          </div>
        </div>
      </section>

      {/* Institute Details Section */}
      <section className="institute-section">
        <h2>Institute Details</h2>
        <div className="institute-info">
          <img
            src="https://media.istockphoto.com/id/517235492/photo/cambridge-university-top-view.jpg?b=1&s=612x612&w=0&k=20&c=JhuhT2Oh5Uis1oZH7lbnQCt4ZLiMp5e_vKv4Bd0HeJg="
            alt="Institute Logo"
            className="institute-logo"
          />
          <div className="institute-details">
            <h3>ABC Institute of Technology</h3>
            <p>Address: 123 Main St, City, State, ZIP</p>
            <p>Contact: +123 456 7890</p>
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section className="download-section">
        <h2>Documents</h2>
        <button className="download-btn">
          <i className="fas fa-download"></i> Download Legal Documents
        </button>
      </section>

      {/* Apply Section */}
      <section className="apply-section">
        <h2>Are You a Fresher?</h2>
        <Link to="/apply">
          <button className="apply-btn">Apply Now</button>
        </Link>
      </section>
    </div>
  );
}

export default Dashboard;
