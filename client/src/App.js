import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alert from "./components/Alert";

// components
import Navbar from "./components/Navbar";

// Screens
import Landing from "./Screens/Landing";
import Login from "./Screens/Login";
import Register from "./Screens/Register";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Alert />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<Landing />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
