import { useEffect, useState } from "react";
import axios from "axios";

const GetEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [editEmp, setEditEmp] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8080/employee", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees(response.data);
    } catch (err) {
      alert("Error fetching employees or Unauthorized");
    }
  };

  const handleDelete = async (empId) => {
    try {
      await axios.delete(`http://localhost:8080/employee/${empId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees(employees.filter((emp) => emp.empId !== empId));
      alert("Employee deleted");
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleEditClick = (emp) => {
    setEditEmp(emp);
    setUpdatedName(emp.name);
    setUpdatedEmail(emp.email);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/employee/${editEmp.empId}`, {
        name: updatedName,
        email: updatedEmail,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Employee updated successfully");
      setEditEmp(null);
      fetchEmployees(); // Refresh table
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Employee List</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            {role === "ROLE_ADMIN" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.empId}>
              <td>{emp.empId}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              {role === "ROLE_ADMIN" && (
                <td>
                  <button
                    onClick={() => handleDelete(emp.empId)}
                    className="btn btn-danger btn-sm me-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEditClick(emp)}
                    className="btn btn-primary btn-sm"
                  >
                    Edit
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {editEmp && (
        <div className="mt-4">
          <h3>Edit Employee</h3>
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            placeholder="Name"
            className="form-control mb-2"
          />
          <input
            type="email"
            value={updatedEmail}
            onChange={(e) => setUpdatedEmail(e.target.value)}
            placeholder="Email"
            className="form-control mb-2"
          />
          <button onClick={handleUpdate} className="btn btn-success me-2">
            Update
          </button>
          <button onClick={() => setEditEmp(null)} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default GetEmployees;
