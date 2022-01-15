import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate, user]);
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          {user ? (
            <>
              <h1 className="x-large">
                Welcome to Dev-Connector {user.firstName}
              </h1>
              <div className="buttons">
                <Link to="/dashboard" className="btn btn-primary">
                  Dashboard
                </Link>
              </div>
            </>
          ) : (
            <>
              <h1 className="x-large">Developer Connector</h1>
              <p className="lead">
                Create a developer profile/portfolio, share posts and get help
                from other developers
              </p>
              <div className="buttons">
                <Link to="/register" className="btn btn-primary">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-light">
                  Login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Landing;
