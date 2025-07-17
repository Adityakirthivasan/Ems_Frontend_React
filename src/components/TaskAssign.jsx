import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const TaskAssign = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ empId: "", task: "" });

  useEffect(() => {
    axios.get("http://localhost:8080/employee/all")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAssign = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:8080/employee/${form.empId}/assign-task`, {
      task: form.task
    })
    .then(() => alert("Task Assigned Successfully"))
    .catch((err) => alert("Error Assigning Task"));
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2>Assign Task to Employee</h2>

      <input
        className="form-control mb-3"
        placeholder="Search by employee name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul className="list-group mb-4">
        {filteredEmployees.map((emp) => (
          <li
            key={emp.empId}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {emp.name} ({emp.email})
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setForm({ ...form, empId: emp.empId })}
            >
              Assign
            </button>
          </li>
        ))}
      </ul>

      {form.empId && (
        <form onSubmit={handleAssign}>
          <div className="mb-3">
            <label className="form-label">Task</label>
            <input
              type="text"
              className="form-control"
              value={form.task}
              onChange={(e) => setForm({ ...form, task: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-success">
            Submit Task
          </button>
        </form>
      )}
    </div>
  );
};

export default TaskAssign;
