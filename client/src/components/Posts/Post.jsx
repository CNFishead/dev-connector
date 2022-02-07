import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import { getPosts } from "../../actions/postActions";

import Loader from "../Loader";
import Meta from "../Meta";

const Post = () => {
  const dispatch = useDispatch();

  // component state

  // app state
  const { posts, loading } = useSelector((state) => state.newsFeed);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <>
      <Meta title={`Discussion Board`} />
      <section className="container">
        <h1 className="large text-primary">Posts</h1>

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
    </>
  );
};

export default Post;
