/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import './OrderProcessed.css';

const OrderProcessed = ({
  customer,
  shippingAddress,
  billingAddress,
  selectedShipping,
  paymentMethod,
  publicOrderId,
}) => (
  <div className="OrderProcessed">
    <div className="OrderProcessed__OrderNumber">Order #</div>
    <div className="OrderProcessed__CustomerName">
      Thank you
      {' '}
      { customer.first_name }
    </div>
    <div className="OrderProcessed__OrderConfirmation">
      <div className="OrderConfirmation__title">Your order is confirmed</div>
      <div className="OrderConfirmation__content">
        We’ve accepted your order, and we’re getting it ready. A confirmation email has been sent to
        {' '}
        { customer.email_address }
        , come back to this page for updates on your order status.
      </div>
    </div>
    <div className="OrderProcessed__OrderInformation">
      <div className="OrderInformation__Title">Customer information</div>
      <div className="OrderInformation__Details--Container">
        <div className="OrderInformation__Details">
          <div className="OrderInformation__Details--Content">
            <div className="Content__Title">Shipping address</div>
            <div className="Content__Details">
              <div className="Content__Details--Detail">
                {shippingAddress?.first_name ?? customer.first_name}
                {' '}
                {shippingAddress?.last_name ?? customer.last_name}
              </div>
              <div className="Content__Details--Detail">
                {shippingAddress.address_line_1}
                {' '}
                {shippingAddress.address_line_2}
              </div>
              <div className="Content__Details--Detail">
                {shippingAddress.city}
                {' '}
                {shippingAddress.province_code}
                {' '}
                {shippingAddress.postal_code}
              </div>
              <div className="Content__Details--Detail">{shippingAddress.country}</div>
            </div>
          </div>
          <div className="OrderInformation__Details--Content">
            <div className="Content__Title">Shipping method</div>
            <div className="Content__Details--Detail">{selectedShipping?.description}</div>
          </div>
        </div>
        <div className="OrderInformation__Details">
          <div className="OrderInformation__Details--Content">
            <div className="Content__Title">Billing address</div>
            <div className="Content__Details">
              <div className="Content__Details--Detail">
                {billingAddress?.first_name ?? customer.first_name}
                {' '}
                {billingAddress?.last_name ?? customer.last_name}

              </div>
              <div className="Content__Details--Detail">
                {billingAddress.address_line_1}
                {' '}
                {billingAddress.address_line_2}
              </div>
              <div className="Content__Details--Detail">
                {billingAddress.city}
                {' '}
                {billingAddress.province_code}
                {' '}
                {billingAddress.postal_code}
              </div>
              <div className="Content__Details--Detail">{ billingAddress.country }</div>
            </div>
          </div>
          <div className="OrderInformation__Details--Content">
            <div className="Content__Title">Payment method</div>
            <div className="Content__Details--Detail">{ paymentMethod }</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

OrderProcessed.propTypes = {
  customer: PropTypes.any,
  shippingAddress: PropTypes.any,
  billingAddress: PropTypes.any,
  selectedShipping: PropTypes.any,
  paymentMethod: PropTypes.any,
  publicOrderId: PropTypes.string,
};

export default OrderProcessed;
