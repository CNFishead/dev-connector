import axios from "axios";
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
import { setAlert } from "./alert";
import { logout } from "./authActions";

export const getPosts =
  (keyword = "", pageNumber = 1) =>
  async (dispatch) => {
    try {
      const { data } = await axios.get(
        `/api/posts?keyword=${keyword}&pageNumber=${pageNumber}`
      );
      dispatch({
        type: GET_POSTS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: POST_ERROR,
        payload: message,
      });
    }
  };
// Add like
// Will also remove the like on a subsequent "click"
export const addLike = (postId) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/posts/like/${postId}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: data },
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: POST_ERROR,
      payload: message,
    });
    dispatch(setAlert(message, "danger"));
  }
};

// Delete post
export const deletePost = (id, navigate) => async (dispatch) => {
  if (
    window.confirm(
      `Are you sure you want to delete this post? this action cannot be undone.`
    )
  ) {
    try {
      await axios.delete(`/api/posts/${id}`);
      dispatch({ type: DELETE_POST, payload: id });
      dispatch(setAlert(`Post: ${id} Has been removed`, "success"));
      navigate("/posts");
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: POST_ERROR,
        payload: message,
      });
      dispatch(setAlert(message, "danger"));
    }
  }
};

// Add post
export const addPost = (formData) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/api/posts`, formData);
    dispatch({ type: ADD_POST, payload: data });
    dispatch(setAlert(`Post Created`, "success"));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: POST_ERROR,
      payload: message,
    });
    dispatch(setAlert(message, "danger"));
  }
};

// Get post
export const getPost = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/posts/${id}`);
    dispatch({ type: GET_POST, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: POST_ERROR,
      payload: message,
    });
    dispatch(setAlert(message, "danger"));
  }
};

// Add comment
export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/api/posts/comment/${postId}`, formData);
    dispatch({ type: ADD_COMMENT, payload: data });
    dispatch(setAlert(`Comment Added`, "success"));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: POST_ERROR,
      payload: message,
    });
    dispatch(setAlert(message, "danger"));
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    const { data } = await axios.delete(
      `/api/posts/comment/${postId}/${commentId}`
    );
    console.log(data);
    dispatch({ type: REMOVE_COMMENT, payload: commentId });
    dispatch(setAlert(`Comment Deleted`, "success"));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: POST_ERROR,
      payload: message,
    });
    dispatch(setAlert(message, "danger"));
  }
};
