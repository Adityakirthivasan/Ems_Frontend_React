// import { useState } from "react";
// import axios from "axios";
//
// const Login = () => {
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//
//   async function handleLogin(event) {
//     event.preventDefault();
//     try {
//       const token = await axios.post("http://localhost:3001/api/auth/login", {
//         userName,
//         password,
//       });
//
//       console.log(token);
//       alert("Login Successful");
//     } catch (e) {
//       console.log("Login error:", e);
//       alert("Invalid Credentials");
//     }
//   }
//
//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <label htmlFor="userName">User Name</label>
//         <input
//           id="userName"
//           type="text"
//           value={userName}
//           onChange={(e) => setUserName(e.target.value)}
//         />
//         <br />
//         <label htmlFor="password">Password</label>
//         <input
//           id="password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <br />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };
//
// export default Login;

import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        userName,
        password,
      });

      const token = response.data.token;
      const role = response.data.roles;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      alert("Login Successful");
      navigate("/");
    } catch (e) {
      alert("Invalid Credentials");
      console.log("Login Error", e);
    }
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header text-center">
              <h2>Login Form</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <div className="form-group mb-3">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary w-100">
                    Submit
                  </button>
                </div>
              </form>
              <p className="mt-3 text-center">
                Create an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
