import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

// actions
import { getPost } from "../../actions/postActions";

// components
import Loader from "../Loader";
import Meta from "../Meta";
import PostItem from "../Posts/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const DiscussionPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { post, loading } = useSelector((state) => state.newsFeed);

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  return loading || post === null ? (
    <Loader />
  ) : (
    <Fragment>
      <Meta title={`${post.name.split(" ")[0]}'s Post`} />
      <section className="container">
        <Link to="/posts" className="btn">
          Back To Posts
        </Link>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />
        {post.comments && (
          <div className="comments">
            {post.comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                postId={post._id}
              />
            ))}
          </div>
        )}
      </section>
    </Fragment>
  );
};

export default DiscussionPage;
