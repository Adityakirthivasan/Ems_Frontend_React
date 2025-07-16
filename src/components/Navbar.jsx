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

import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
      <Link className="navbar-brand" to="/">EMS</Link>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/">Employees</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
