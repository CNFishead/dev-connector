import {
  ADD_COMMENT,
  ADD_POST,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  POST_ERROR,
  REMOVE_COMMENT,
  UPDATE_LIKES,
} from "../constants/postConstants";

export const postReducer = (
  state = { posts: [], post: null, loading: false, error: {} },
  action
) => {
  switch (action.type) {
    case GET_POSTS_REQUEST:
      return { ...state, loading: true };
    case GET_POSTS_SUCCESS:
      return { loading: false, ...state, posts: action.payload };
    // case GET_POSTS:
    //   return {
    //     ...state,
    //     posts: payload,
    //     loading: false,
    //   };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.action.payload, ...state.posts],
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
          post._id === action.payload.id
            ? { ...post, likes: action.payload.likes }
            : post
        ),
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: action.payload },
        loading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
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
