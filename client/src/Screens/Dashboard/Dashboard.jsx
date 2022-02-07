import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import Loader from "../../components/Loader";
import Meta from "../../components/Meta";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";

// actions
import { getCurrentProfile } from "../../actions/profileActions";
import { deleteAccount } from "../../actions/profileActions";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // define
  const dispatch = useDispatch();

  // component state
  const [profileAlert, setProfileAlert] = useState(true);

  // App State
  const { user } = useSelector((state) => state.auth);
  const { loading, profile } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);
  return (
    <div>
      <Meta title={`${user.firstName}'s Dashboard`} />
      {loading && profile === null ? (
        <Loader />
      ) : (
        <div className="container">
          <p className="lead">
            <i className="fas fa-user" /> Welcome to the community{" "}
            {user && `${user.firstName} ${user.lastName}`}
          </p>
          <DashboardActions />
          {profile !== null ? (
            <></>
          ) : profileAlert ? (
            <div
              style={{
                background: "#ffcfdb",
                margin: "2% 0",
                padding: "2%",
                position: "relative",
                textAlign: "center",
              }}
            >
              <i
                className="fas fa-minus profile-alert"
                onClick={() => setProfileAlert(!profileAlert)}
              ></i>
              <p>
                You have not yet setup a profile, please add your profile to let
                others know who you are!
              </p>
              <Link to="/create-profile" className="btn btn-primary my-1">
                Create Profile
              </Link>
            </div>
          ) : (
            <div></div>
          )}
          {profile && profile.experience !== null && (
            <Experience experience={profile.experience} />
          )}

          {profile && profile.education !== null && (
            <Education education={profile.education} />
          )}

          <div className="my-2">
            {" "}
            <button
              className="btn btn-danger"
              onClick={() => dispatch(deleteAccount())}
            >
              <i className="fas fa-user-minus"></i> Delete my Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
