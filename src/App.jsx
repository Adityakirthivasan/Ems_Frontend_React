import React from 'react';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <h1>Authentication Portal</h1>
      <Register />
      <hr />
      <Login />
    </div>
  );
}

export default App;
