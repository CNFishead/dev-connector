import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import Loader from "../../components/Loader";
import Meta from "../../components/Meta";
import Post from "../../components/Post";
import DashboardActions from "./DashboardActions";

// actions
import { getCurrentProfile } from "../../actions/profileActions";

const Dashboard = () => {
  // define
  const dispatch = useDispatch();
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
          <Post />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
