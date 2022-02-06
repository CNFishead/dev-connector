import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch, useSelector } from "react-redux";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import { getPosts } from "../../actions/postActions";

import Loader from "../Loader";
import { Link } from "react-router-dom";

const Post = () => {
  const dispatch = useDispatch();

  // component state
  const [profileAlert, setProfileAlert] = useState(true);

  // app state
  const { posts, loading } = useSelector((state) => state.newsFeed);
  const { profile } = useSelector((state) => state.profile);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <section>
      <h1 className="large text-primary">Posts</h1>
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
      <PostForm />
      {loading ? (
        <Loader />
      ) : (
        <div className="posts">
          {posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
};

Post.propTypes = {
  getPosts: PropTypes.func.isRequired,
  // post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Post);
