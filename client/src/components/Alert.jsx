import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

const Alert = () => {
  // App State
  const alert = useSelector((state) => state.alert);
  return (
    <div className="alert-wrapper">
      {alert.map((alert) => (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
          {alert.message}
        </div>
      ))}
    </div>
  );
};

Alert.propTypes = {
  alert: PropTypes.array.isRequired,
};

export default Alert;
