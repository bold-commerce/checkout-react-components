/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-expressions */
import React from 'react';
import PropTypes from 'prop-types';
import EmptyState from '../empty_state/EmptyState';
import LoadingState from '../loading_state/LoadingState';
import './Payment.css';

const PaymentMethod = ({
  paymentIframe,
  shippingErrors,
  billingErrors,
  isLoading,
  isValid,
}) => {
  let content = <EmptyState title="To view payment options, complete filling in your address" />;

  if (isLoading && isValid) {
    content = <LoadingState />;
  } else if (isValid) {
    content = null;
  }

  if (!!shippingErrors || !!billingErrors) {
    return (
      <section className="FieldSet FieldSet--PaymentMethod">
        <div className="FieldSet__Header">
          <div className="FieldSet__Heading">Payment methods</div>
        </div>
        <div className="FieldSet__Content">
          <EmptyState title="To view payment options, complete filling in your address" />
        </div>
      </section>
    );
  }

  return (
    <section className="FieldSet FieldSet--PaymentMethod">
      <div className="FieldSet__Header">
        <div className="FieldSet__Heading">Payment methods</div>
      </div>
      <div className="FieldSet__Content">
        {
          content
        }
        <div style={{
          display: isLoading ? 'none' : '',
        }}
        >
          {
            isValid && !shippingErrors && !billingErrors && (paymentIframe)
          }
        </div>
      </div>
    </section>
  );
};

PaymentMethod.propTypes = {
  paymentIframe: PropTypes.any,
  shippingErrors: PropTypes.any,
  billingErrors: PropTypes.any,
  isLoading: PropTypes.bool,
  isValid: PropTypes.bool,
};

export default PaymentMethod;
