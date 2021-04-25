import React from 'react';
import {
  LoadingSpinner,
} from '@boldcommerce/stacks-ui';
import './OrderProcessing.css';

const OrderProcessing = () => (
  <div className="OrderProcessing">
    <div className="OrderProcessing__Content">
      <div className="OrderProcessing__Progress">
        <LoadingSpinner />
      </div>
      <div className="OrderProcessing__Title">
        Processing order...
      </div>
      <div className="OrderProcessing__Description">
        This may take a few moments. Please remain on the page until the process is complete.
      </div>
    </div>
  </div>
);

export default OrderProcessing;
