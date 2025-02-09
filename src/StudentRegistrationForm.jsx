import { useState } from "react";

const StudentRegistrationForm = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    courses: "",
    idNumber: "",
    emergencyContactEmail: "",
    emergencyContactPhone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to register student");

      alert("Student registered successfully!");
      onRegister(); // Refresh student list

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        courses: "",
        idNumber: "",
        emergencyContactEmail: "",
        emergencyContactPhone: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Student Registration</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        {["name", "email", "phone", "address", "courses", "idNumber", "emergencyContactEmail", "emergencyContactPhone"].map((field) => (
          <input
            key={field}
            type={field.includes("email") ? "email" : field.includes("phone") ? "tel" : "text"}
            name={field}
            placeholder={field.replace(/([A-Z])/g, " $1")}
            className="input-field"
            onChange={handleChange}
            value={formData[field]}
            required
          />
        ))}
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Registering..." : "Register Student"}
        </button>
      </form>
    </div>
  );
};

export default StudentRegistrationForm;
