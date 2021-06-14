import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CheckoutStore } from '../../store';

const CheckoutApp = ({ children }) => {
  const { state, dispatch } = useContext(CheckoutStore);
  const { apiPath, token } = state;

  const initCheckout = async () => {
    const response = await fetch(`${apiPath}/session/start?token=${token}`, {
      mode: 'cors',
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    dispatch({
      type: 'checkout/init',
      payload: data.data.csrf_token,
    });
  };

  useEffect(() => {
    initCheckout();
  }, [dispatch]);

  if (!state.csrf) return null;

  return (
    <>
      {children}
    </>
  );
};

CheckoutApp.propTypes = {
  children: PropTypes.node,
};

export default CheckoutApp;
