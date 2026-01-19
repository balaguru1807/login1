import { useState } from "react";
import axios from "axios";
import "./Auth.css";

function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage(""); // Clear message when user types
  };

  const handleSignup = async e => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/signup", {
        name: form.name,
        email: form.email,
        password: form.password
      });
      setMessage(response.data.message);
      setMessageType("success");
      // After successful signup, automatically switch to login mode
      setIsSignup(false);
      // Clear name field for login
      setForm({ ...form, name: "" });
    } catch (error) {
      setMessage(error.response?.data?.error || "Signup failed");
      setMessageType("error");
    }
  };

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: form.email,
        password: form.password
      });
      setMessage(response.data.message);
      setMessageType("success");
    } catch (error) {
      setMessage(error.response?.data?.error || "Authentication failed");
      setMessageType("error");
    }
  };

  const handleSubmit = e => {
    if (isSignup) {
      handleSignup(e);
    } else {
      handleLogin(e);
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setForm({ name: "", email: "", password: "" });
    setMessage("");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">{isSignup ? "Sign Up" : "Login"}</h2>
          <div className="title-underline"></div>
        </div>
        
        {message && (
          <div className={`message ${messageType} ${message ? "message-enter" : ""}`}>
            <span className="message-icon">
              {messageType === "success" ? "✓" : "✕"}
            </span>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {isSignup && (
            <div className="input-wrapper">
              <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
                className="auth-input"
              />
            </div>
          )}
          <div className="input-wrapper">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="auth-input"
            />
          </div>
          <div className="input-wrapper">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="auth-input"
            />
          </div>
          <button type="submit" className="auth-button">
            <span className="button-text">{isSignup ? "Sign Up" : "Login"}</span>
            <span className="button-shine"></span>
          </button>
        </form>

        <div className="auth-footer">
          <button type="button" onClick={toggleMode} className="toggle-button">
            {isSignup
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;


