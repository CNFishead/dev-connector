import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/authActions";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  return (
    <nav className="navbar bg-dark">
      <h1 style={{ display: "inline" }}>
        <Link to="/">
          <i className="fas fa-code"></i>{" "}
          <span className="xs-hide">DevConnector</span>
        </Link>
      </h1>
      {user && (
        <img
          src={`https:${user.avatar}`}
          alt="user profile pic"
          style={{ width: "50px", borderRadius: "50%" }}
        />
      )}

      <ul>
        {user ? (
          <>
            <li>
              <Link to="/dashboard">
                {" "}
                <i className="fas fa-user" />{" "}
                <span className="hide-sm">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/profiles">Developers</Link>
            </li>
            <li>
              <Link to="" onClick={() => dispatch(logout())}>
                <i className="fas fa-sign-out-alt" />{" "}
                <span className="hide-sm">Logout</span>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/profiles">Developers</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
