import React from 'react';
import PropTypes from 'prop-types';
import LoadingState from '../loading_state/LoadingState';
import { usePaymentIframe } from '../../hooks';

const PaymentIframe = ({
  paymentIframeLoadingStatus, paymentIframeUrl, paymentIframeHeight, paymentIframeOnLoaded, hide,
}) => {
  const style = {
    height: `${paymentIframeHeight}px`,
    display: (paymentIframeLoadingStatus === 'fetching' || hide) ? 'none' : '',
  };

  const iframe = (
    <iframe
      title="payments"
      src={paymentIframeUrl}
      style={style}
      onLoad={paymentIframeOnLoaded}
    />
  );

  return (
    <>
      { (paymentIframeLoadingStatus === 'fetching' && !hide) && <LoadingState /> }
      { iframe }
    </>
  );
};

PaymentIframe.propTypes = {
  paymentIframeLoadingStatus: PropTypes.string,
  paymentIframeUrl: PropTypes.string,
  paymentIframeHeight: PropTypes.number,
  paymentIframeOnLoaded: PropTypes.func,
  hide: PropTypes.bool,
};

const MemoizedPaymentIframe = React.memo(PaymentIframe);

const PaymentIframeContainer = ({ hide }) => {
  const {
    paymentIframeLoadingStatus, paymentIframeUrl, paymentIframeHeight, paymentIframeOnLoaded,
  } = usePaymentIframe();

  return (
    <MemoizedPaymentIframe
      paymentIframeLoadingStatus={paymentIframeLoadingStatus}
      paymentIframeUrl={paymentIframeUrl}
      paymentIframeHeight={paymentIframeHeight}
      paymentIframeOnLoaded={paymentIframeOnLoaded}
      hide={hide}
    />
  );
};

PaymentIframeContainer.propTypes = {
  hide: PropTypes.bool,
};

export default PaymentIframeContainer;
