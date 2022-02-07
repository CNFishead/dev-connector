import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import { useDispatch, useSelector } from "react-redux";
import { addLike, deletePost } from "../../actions/postActions";
import { useEffect } from "react";

const PostItem = ({
  // post: { _id, text, name, avatar, user, likes, comments, createdAt },
  showActions,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user: auth, loading } = useSelector((state) => state.auth);
  const {
    post: { _id, text, name, avatar, user, likes, comments, createdAt },
  } = useSelector((state) => state.newsFeed);
  useEffect(() => {}, [dispatch]);
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">Posted on {formatDate(createdAt)}</p>

        <button
          onClick={() => dispatch(addLike(_id))}
          type="button"
          className="btn btn-light"
        >
          <i className="fas fa-thumbs-up" />{" "}
          <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
        </button>
        {showActions && (
          <Fragment>
            <Link to={`/post/discussion/${_id}`} className="btn btn-primary">
              Discussion{" "}
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>
          </Fragment>
        )}
        {!loading && user === auth._id && (
          <button
            onClick={() => dispatch(deletePost(_id, navigate))}
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times" />
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  showActions: PropTypes.bool,
};

export default PostItem;
