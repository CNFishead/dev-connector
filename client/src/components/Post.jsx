import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch, useSelector } from "react-redux";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import { getPosts } from "../actions/postActions";

import Loader from "./Loader";

const Post = () => {
  const dispatch = useDispatch();

  // app state
  const { posts, loading } = useSelector((state) => state.newsFeed);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, loading]);

  return (
    <section className="container">
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      <PostForm />
      <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
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