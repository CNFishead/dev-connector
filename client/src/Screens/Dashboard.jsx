import React from "react";
import { useSelector } from "react-redux";

// components
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import Post from "../components/Post";

const Dashboard = () => {
  // App State
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <Meta title={`${user.firstName}'s Dashboard`} />
      <Post />
    </div>
  );
};

export default Dashboard;
