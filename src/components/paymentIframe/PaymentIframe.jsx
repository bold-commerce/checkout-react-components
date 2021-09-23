import React from 'react';
import PropTypes from 'prop-types';
import { usePaymentIframe } from '../../hooks';

const PaymentIframe = ({
  paymentIframeUrl, paymentIframeHeight, paymentIframeOnLoaded,
}) => {
  const style = {
    height: `${paymentIframeHeight}px`,
  };

  return (
    <iframe
      title="payments"
      data-bold-pigi-iframe
      src={paymentIframeUrl}
      style={style}
      onLoad={paymentIframeOnLoaded}
    />
  );
};

PaymentIframe.propTypes = {
  paymentIframeUrl: PropTypes.string,
  paymentIframeHeight: PropTypes.number,
  paymentIframeOnLoaded: PropTypes.func,
};

const MemoizedPaymentIframe = React.memo(PaymentIframe);

const PaymentIframeContainer = () => {
  const { data, loadingStatus, paymentIframeOnLoaded } = usePaymentIframe();

  return (
    <MemoizedPaymentIframe
      paymentIframeLoadingStatus={loadingStatus}
      paymentIframeUrl={data.url}
      paymentIframeHeight={data.height}
      paymentIframeOnLoaded={paymentIframeOnLoaded}
    />
  );
};

export default PaymentIframeContainer;
