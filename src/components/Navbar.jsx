// const Navbar = ({ onLoginClick, onRegisterClick, activeTab }) => {
//   return (
//     <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
//       <div className="text-2xl font-bold">Auth App</div>
//       <div className="space-x-4">
//         <button
//           onClick={onLoginClick}
//           className={`px-4 py-2 rounded transition ${
//             activeTab === "login"
//               ? "bg-white text-blue-600"
//               : "hover:bg-blue-500"
//           }`}
//         >
//           Login
//         </button>
//         <button
//           onClick={onRegisterClick}
//           className={`px-4 py-2 rounded transition ${
//             activeTab === "register"
//               ? "bg-white text-blue-600"
//               : "hover:bg-blue-500"
//           }`}
//         >
//           Register
//         </button>
//       </div>
//     </nav>
//   );
// };
//
// export default Navbar;
//
// import { Link } from "react-router-dom";
//
// const Navbar = () => (
//   <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//     <div className="container">
//       <Link className="navbar-brand" to="/">EMS</Link>
//       <ul className="navbar-nav">
//         <li className="nav-item">
//           <Link className="nav-link" to="/">Employees</Link>
//         </li>
//         <li className="nav-item">
//           <Link className="nav-link" to="/register">Register</Link>
//         </li>
//         <li className="nav-item">
//           <Link className="nav-link" to="/login">Login</Link>
//         </li>
//       </ul>
//     </div>
//   </nav>
// );
//
// export default Navbar;

import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const [logout, setLogout] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLogout(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setLogout(false);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Employee Management System</Link>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/employees">Employees</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/addemployee">Add</Link>
          </li>
        </ul>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "200px" }}
        />
        {logout ? (
          <button className="btn btn-outline-light ms-3" onClick={handleLogout}>Logout</button>
        ) : (
          <Link className="btn btn-outline-light ms-3" to="/">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
