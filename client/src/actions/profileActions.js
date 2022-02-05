import axios from "axios";
import { setAlert } from "./alert";
import { GET_PROFILE, PROFILE_ERROR } from "../constants/profileConstants";

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
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: message, status: error.response.status },
      });
      dispatch(setAlert(message, "danger"));
    }
  };
