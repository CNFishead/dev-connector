import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alert from "./components/Alert";

// components
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./Screens/Dashboard";

// Screens
import Landing from "./Screens/Landing";
import Login from "./Screens/Login";
import Register from "./Screens/Register";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Alert />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
};

export default App;
