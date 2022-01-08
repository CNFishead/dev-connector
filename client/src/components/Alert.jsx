import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

const Alert = () => {
  // App State
  const alert = useSelector((state) => state.alert);
  return (
    alert !== null &&
    alert.length > 0 &&
    alert.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.message}
      </div>
    ))
  );
};

Alert.PropTypes = { alerts: PropTypes.array.isRequired };

export default Alert;
