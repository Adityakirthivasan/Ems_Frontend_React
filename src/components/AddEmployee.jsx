import { useState } from "react";
import axios from "axios";

const AddEmployee = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    userName: "",
    task: "",
    roleNames: ["ROLE_USER"],
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://springboot-project-0j6s.onrender.com/api/auth/register", form, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Employee Added Successfully");
      setForm({
        name: "",
        email: "",
        password: "",
        userName: "",
        task: "",
        roleNames: ["ROLE_USER"],
      });
    } catch (err) {
      alert("Error while adding employee");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name:</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Email:</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Username:</label>
          <input type="text" name="userName" value={form.userName} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Password:</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Task:</label>
          <input type="text" name="task" value={form.task} onChange={handleChange} className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
