import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => (
  <div className='mt-5 font-bold text-right'>
    {alerts.map((alert) => (
      <div key={alert.id} className={`mb-2 pr-6  bg-${alert.alertType}-500`}>
        {alert.msg}
      </div>
    ))}
  </div>
);

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
