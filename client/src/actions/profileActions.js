import axios from "axios";
import { setAlert } from "./alert";
import {
  CLEAR_PROFILE,
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  PROFILE_ERROR,
  UPDATE_PROFILE,
} from "../constants/profileConstants";
import { logout } from "./authActions";
import { DELETE_ACCOUNT } from "../constants/authConstants";

// Get Current users profile
export const getCurrentProfile = () => async (dispatch, getState) => {
  try {
    const {
      auth: { user },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const res = await axios.get("/api/profile/me", config);
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: message, status: error.response.status },
    });
  }
};

// Get All profiles
export const getAllProfiles = () => async (dispatch, getState) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const {
      auth: { user },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const res = await axios.get("/api/profile", config);
    dispatch({ type: GET_PROFILES, payload: res.data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: message, status: error.response.status },
    });
    dispatch(setAlert(message, "danger"));
  }
};

// Get profile by id
export const getProfileById = (userId) => async (dispatch, getState) => {
  try {
    const {
      auth: { user },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const res = await axios.get(`/api/profile/user/${userId}`, config);
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: message, status: error.response.status },
    });
    dispatch(setAlert(message, "danger"));
  }
};

// Get profile github repos
export const getGithubRepos = (username) => async (dispatch, getState) => {
  try {
    const {
      auth: { user },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const res = await axios.get(`/api/profile/github/${username}`, config);
    dispatch({ type: GET_REPOS, payload: res.data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: message, status: error.response.status },
    });
    dispatch(setAlert(message, "danger"));
  }
};

// Create or Update profile
// history is passed in to redirect
// edit is to know wether or not to use put or post
export const createProfile =
  (form, navigate, edit) => async (dispatch, getState) => {
    try {
      const {
        auth: { user },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const res = await axios.post("/api/profile", form, config);
      dispatch({ type: GET_PROFILE, payload: res.data });
      dispatch(
        setAlert(
          edit ? `User Profile has been updated!` : `User Profile Created`,
          "success"
        )
      );
      if (!edit) {
        navigate("/dashboard");
      }
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: message, status: error.response.status },
      });
      dispatch(setAlert(message, "danger"));
    }
  };

// Add work experience
// history is passed in to redirect
export const addExperience = (form, navigate) => async (dispatch, getState) => {
  try {
    const {
      auth: { user },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const res = await axios.put("/api/profile/experience", form, config);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert("Experience added", "success"));

    navigate("/dashboard");
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: message, status: error.response.status },
    });
    dispatch(setAlert(message, "danger"));
  }
};

// Add Education
// history is passed in to redirect
export const addEducation = (form, navigate) => async (dispatch, getState) => {
  try {
    const {
      auth: { user },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const res = await axios.put("/api/profile/education", form, config);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert("Education added", "success"));

    navigate("/dashboard");
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: message, status: error.response.status },
    });
    dispatch(setAlert(message, "danger"));
  }
};

// Remove Experience
export const deleteExperience = (id) => async (dispatch, getState) => {
  try {
    const {
      auth: { user },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const res = await axios.delete(`/api/profile/experience/${id}`, config);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert("Experience Removed", "success"));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: message, status: error.response.status },
    });
    dispatch(setAlert(message, "danger"));
  }
};

// Remove Education
export const deleteEducation = (id) => async (dispatch, getState) => {
  try {
    const {
      auth: { user },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const res = await axios.delete(`/api/profile/education/${id}`, config);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert("Education Removed", "success"));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: message, status: error.response.status },
    });
    dispatch(setAlert(message, "danger"));
  }
};

// Remove Account
export const deleteAccount = () => async (dispatch, getState) => {
  if (window.confirm(`Are you sure? This action can NOT be undone!`)) {
    try {
      const {
        auth: { user },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.delete(`/api/profile`, config);
      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: DELETE_ACCOUNT });
      dispatch(setAlert("Your Account has been permanently deleted"));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: message, status: error.response.status },
      });
      dispatch(setAlert(message, "danger"));
    }
  }
};
