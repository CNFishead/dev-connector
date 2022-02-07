import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alert from "./components/Alert";

// components
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import CreateProfile from "./components/profile-forms/CreateProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Profiles from "./components/Profiles/Profiles";
import Profile from "./components/Profile/Profile";
import DiscussionPage from "./components/Post/DiscussionPage";

// Screens
import Landing from "./Screens/Landing";
import Login from "./Screens/Login";
import NotFound from "./Screens/NotFound";
import Register from "./Screens/Register";
import Dashboard from "./Screens/Dashboard/Dashboard";
import Post from "./components/Posts/Post";
import { useSelector } from "react-redux";
import setAuthToken from "./utils/setAuthToken";

const App = () => {
  // This sets the common headers for axios
  // if there is a user object, that object has a token
  // set the common header to that token
  const { user } = useSelector((state) => state.auth);
  if (user) {
    setAuthToken(user.token);
  }
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
          path="/add-experience"
          element={
            <PrivateRoute>
              <AddExperience />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-education"
          element={
            <PrivateRoute>
              <AddEducation />
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
        <Route
          path="/posts"
          element={
            <PrivateRoute>
              <Post />
            </PrivateRoute>
          }
        />
        <Route
          path="/post/discussion/:id"
          element={
            <PrivateRoute>
              <DiscussionPage />
            </PrivateRoute>
          }
        />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Landing />} />
        {/* Catches all routes not handled by App found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
