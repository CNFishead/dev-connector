import {
  CLEAR_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
} from "../constants/profileConstants";

const initialState = {
  profile: null,
  // List of profiles
  profiles: [],
  // this is for the repos of a certain profile.
  repos: [],
  loading: true,
  error: {},
};

export const profileReducer = (state = initialState, action) => {
  // destructure
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repose: [],
        loading: false,
      };
    default:
      return state;
  }
};
