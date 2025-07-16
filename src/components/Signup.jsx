// import React, { useState } from 'react';
// import axios from 'axios';
//
// const Register = () => {
//   const [formData, setFormData] = useState({
//     empId: '',
//     name: '',
//     email: '',
//     password: '',
//     userName: '',
//     roleNames: [],
//   });
//
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };
//
//   const handleRolesChange = (e) => {
//
//     setFormData(prev => ({
//       ...prev,
//       roleNames: e.target.value.split(',').map(role => role.trim())
//     }));
//   };
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:3001/api/auth/register', {
//         ...formData,
//         empId: Number(formData.empId),
//       });
//       alert('Registered Successfully!');
//     } catch (err) {
//       console.error('Register Error', err);
//       alert('Registration failed.');
//     }
//   };
//
//   return (
//     <div>
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="number" name="empId" value={formData.empId} onChange={handleChange} placeholder="Employee ID" required /><br /><br />
//         <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required /><br /><br />
//         <input type="text" name="userName" value={formData.userName} onChange={handleChange} placeholder="Username" required /><br /><br />
//         <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required /><br /><br />
//         <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required /><br /><br />
//         <input type="text" name="roleNames" onChange={handleRolesChange} placeholder="Roles (comma separated)" /><br /><br />
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };
//
// export default Register;

// src/components/Signup.jsx
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [roleNames, setRoles] = useState("");

  async function addNewEmployee(e) {
    e.preventDefault();
    const roleArray = roleNames.split(",").map((role) => role.trim());

    try {
      const res = await axios.post("http://localhost:8080/api/auth/register", {
        name,
        email,
        userName,
        password,
        roleNames: roleArray,
      });

      alert(res.data || "Registration Success");
    } catch (err) {
      console.error("Signup Error", err);
      alert("Signup failed");
    }
  }

  return (
    <div className="container mt-5">
      <div className="col-md-6 offset-md-3">
        <h2 className="text-center">Register</h2>
        <form onSubmit={addNewEmployee}>
          <div className="form-group mb-3">
            <label>Name</label>
            <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group mb-3">
            <label>Email</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group mb-3">
            <label>Username</label>
            <input className="form-control" value={userName} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group mb-3">
            <label>Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-group mb-3">
            <label>Roles (comma-separated)</label>
            <input className="form-control" value={roleNames} onChange={(e) => setRoles(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-success w-100">Sign Up</button>
          <p className="mt-3 text-center">
            Already a user? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
