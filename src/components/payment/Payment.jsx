import React from 'react';
import PropTypes from 'prop-types';
import EmptyState from '../empty_state/EmptyState';
import { usePaymentMethod } from '../../hooks';
import PaymentIframe from './PaymentIframe';
import './Payment.css';

const PaymentMethod = ({ showPaymentMethod }) => {
  if (showPaymentMethod) {
    return (
      <section className="FieldSet FieldSet--PaymentMethod">
        <div className="FieldSet__Header">
          <div className="FieldSet__Heading">Payment methods</div>
        </div>
        <div className="FieldSet__Content">
          <EmptyState title="To view payment options, complete filling in your address" />
          <PaymentIframe key="paymentIframe" hide />
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
        <PaymentIframe key="paymentIframe" />
      </div>
    </section>
  );
};

PaymentMethod.propTypes = {
  showPaymentMethod: PropTypes.bool,
};

const MemoizedPaymentMethod = React.memo(PaymentMethod);

const PaymentMethodContainer = () => {
  const { showPaymentMethod } = usePaymentMethod();

  return <MemoizedPaymentMethod showPaymentMethod={showPaymentMethod} />;
};

export default PaymentMethodContainer;
