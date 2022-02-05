import axios from "axios";
import {
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  POST_ERROR,
} from "../constants/postConstants";
import { logout } from "./authActions";

export const getPosts =
  (keyword = "", pageNumber = 1) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_POSTS_REQUEST,
      });

      const {
        auth: { user },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/posts?keyword=${keyword}&pageNumber=${pageNumber}`,
        config
      );
      dispatch({
        type: GET_POSTS_SUCCESS,
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
export const addLike = (id) => async (dispatch) => {};

// Remove like
export const removeLike = (id) => async (dispatch) => {};

// Delete post
export const deletePost = (id) => async (dispatch) => {};

// Add post
export const addPost = (formData) => async (dispatch) => {};

// Get post
export const getPost = (id) => async (dispatch) => {};

// Add comment
export const addComment = (postId, formData) => async (dispatch) => {};

// Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {};
