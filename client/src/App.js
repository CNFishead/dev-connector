import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alert from "./components/Alert";
import store from "./store";
// actions
import { loadUser } from "./actions/authActions";
import setAuthToken from "./utils/setAuthToken";

// components
import Navbar from "./components/Navbar";

// Screens
import Landing from "./Screens/Landing";
import Login from "./Screens/Login";
import Register from "./Screens/Register";

if (localStorage.userInfo.token) {
  setAuthToken(localStorage.userInfo.token);
}

const App = () => {
  return (
    <Router>
      <Navbar />
      <Alert />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
};

export default App;
