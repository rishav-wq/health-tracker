import { useState } from 'react';
import { mockApplications } from './mockData'; // Import your mock data
import './sagDashboard.scss'; // Make sure to add your styling

const SAGDashboard = () => {
  const [applications, setApplications] = useState(mockApplications);
  const [selectedApp, setSelectedApp] = useState(null);

  const handleApproval = (id) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: 'Approved' } : app
    ));
  };

  const handleDisapproval = (id) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: 'Disapproved' } : app
    ));
  };

  const handleViewDocuments = (app) => {
    setSelectedApp(app);
  };

  const handleCloseModal = () => {
    setSelectedApp(null);
  };

  return (
    <div className='sag-dashboard'>
      <h1>SAG Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app.id}>
              <td>{app.name}</td>
              <td>{app.email}</td>
              <td>{app.status}</td>
              <td>
                <button onClick={() => handleViewDocuments(app)}>View Documents</button>
                <button onClick={() => handleApproval(app.id)}>Approve</button>
                <button onClick={() => handleDisapproval(app.id)}>Disapprove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedApp && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={handleCloseModal}>&times;</span>
            <h2>Documents for {selectedApp.name}</h2>
            <p>Email: {selectedApp.email}</p>
            <div className='documents'>
              <h3>10th Marksheet:</h3>
              <img src={selectedApp.documents.tenthMarksheet} alt='10th Marksheet' />
              <h3>12th Marksheet:</h3>
              <img src={selectedApp.documents.twelfthMarksheet} alt='12th Marksheet' />
              <h3>Aadhar Card:</h3>
              <img src={selectedApp.documents.aadharCard} alt='Aadhar Card' />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SAGDashboard;
