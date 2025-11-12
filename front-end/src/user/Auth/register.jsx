import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/Auths/authSlice"; // tu dois avoir cette action
import "../style/Login.css";

function Register() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [role_id, setRoleId] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password, password_confirmation, role_id }));
  };

  useEffect(() => {
    if (user) {
      console.log(" Register success");
    }
  }, [user]);

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>

        <div className="input-box">
          <input
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <i className="bx bxs-user"></i>
        </div>

        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <i className="bx bx-envelope"></i>
        </div>

        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i className="bx bxs-lock-alt"></i>
        </div>

        <div className="input-box">
          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={password_confirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <i className="bx bxs-lock-alt"></i>
        </div>
        <input type="hidden" name="role_id" value={role_id} />

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="register-link">
          <p>
            Already have an account? <a href="/">Login</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
