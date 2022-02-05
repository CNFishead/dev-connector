import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alert from "./components/Alert";

// components
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import CreateProfile from "./components/profile-forms/CreateProfile";

// Screens
import Landing from "./Screens/Landing";
import Login from "./Screens/Login";
import NotFound from "./Screens/NotFound";
import Register from "./Screens/Register";
import Dashboard from "./Screens/Dashboard/Dashboard";


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
        <Route
          path="/create-profile"
          element={
            <PrivateRoute>
              <CreateProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <PrivateRoute>
              <CreateProfile />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Landing />} />
        {/* Catches all routes not handled by App found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
