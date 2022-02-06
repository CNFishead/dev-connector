import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// actions
import { getAllProfiles } from "../../actions/profileActions";

// components
import ProfileItem from "./ProfileItem";
import Loader from "../Loader";
import Meta from "../Meta";

const Profiles = () => {
  const dispatch = useDispatch();
  // App State
  const { profiles, loading } = useSelector((state) => state.profile);
  useEffect(() => {
    dispatch(getAllProfiles());
  }, [dispatch]);
  return (
    <Fragment>
      <Meta title={`Browse Developers`} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <section className="container">
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
              <i className="fab fa-connectdevelop"></i> Browse and Connect with
              developers
            </p>
            <div className="profiles">
              {profiles.length > 0 ? (
                profiles.map((profile) => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))
              ) : (
                <h4>No Profiles Found...</h4>
              )}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profiles;
