import {
  ADD_COMMENT,
  ADD_POST,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  REMOVE_COMMENT,
  UPDATE_LIKES,
} from "../constants/postConstants";

export const postReducer = (
  state = { posts: [], post: null, loading: true, error: {} },
  action
) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        // Create a copy of [posts] and then add in the new {post}
        posts: [action.payload, ...state.posts],
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.postId
            ? // If match return the post, with updated amount of likes.
              { ...post, likes: action.payload.likes }
            : // else, return post
              post
        ),
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        // return the { post } get whatever is in it currently
        // then manipulate the comments, replacing all the comments
        // because the payload is ALL comments.
        post: { ...state.post, comments: action.payload },
        loading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          // return the rest of the state of the post
          ...state.post,
          // filter through the comments so that the deleted comment
          // is the comment that is removed
          comments: state.post.comments.filter(
            (comment) => comment._id !== action.payload
          ),
        },
        loading: false,
      };
    default:
      return state;
  }
};
