import { useState } from "react";
import "./applyPage.scss";

function ApplyPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    documents: {
      tenthMarksheet: null,
      twelfthMarksheet: null,
      aadharCard: null,
    },
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      documents: { ...formData.documents, [e.target.name]: e.target.files[0] },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("email", formData.email);
    data.append("tenthMarksheet", formData.documents.tenthMarksheet);
    data.append("twelfthMarksheet", formData.documents.twelfthMarksheet);
    data.append("aadharCard", formData.documents.aadharCard);

    try {
      const response = await fetch("http://localhost:5173/upload-documents", {
        method: "POST",
        body: data,
        credentials: "include", // Ensures cookies are sent with the request
      });
      if (response.ok) {
        setMessage("Application Submitted Successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          documents: {
            tenthMarksheet: null,
            twelfthMarksheet: null,
            aadharCard: null,
          },
        });
      } else {
        const errorText = await response.text();
        setMessage(`Error submitting application: ${errorText}`);
      }
    } catch (error) {
      console.error('Submit error:', error);
      setMessage("Error submitting application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="apply-page">
      <h1>Application Form</h1>
      <form className="apply-form" onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="tenthMarksheet">10th Marksheet</label>
          <input
            id="tenthMarksheet"
            type="file"
            name="tenthMarksheet"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="twelfthMarksheet">12th Marksheet</label>
          <input
            id="twelfthMarksheet"
            type="file"
            name="twelfthMarksheet"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="aadharCard">Aadhar Card</label>
          <input
            id="aadharCard"
            type="file"
            name="aadharCard"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Application"}
        </button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default ApplyPage;
