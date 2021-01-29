import React, { useContext } from 'react';
import './OrderProcessed.css';
import CheckoutContext from '../Context';


const OrderProcessed = () => {
  const { applicationState } = useContext(CheckoutContext);
  const { customer, addresses, payments } = applicationState;
  const { billing, shipping } = addresses;
  const { email_address, first_name, last_name } = customer;

  const paymentMethod = payments.length === 1 ? payments[0].brand : payments.reduce((prevVal, currVal, idx) => (idx === 0 ? currVal.brand : `${prevVal}, ${currVal.brand}`), '');

  return (
    <div className="OrderProcessed">
      <div className="OrderProcessed__OrderNumber">Order #6758493938</div>
      <div className="OrderProcessed__CustomerName">
        Thank you
        {' '}
        { first_name }
      </div>
      <div className="OrderProcessed__OrderConfirmation">
        <div className="OrderConfirmation__title">Your order is confirmed</div>
        <div className="OrderConfirmation__content">
          We’ve accepted your order, and we’re getting it ready. A confirmation email has been sent to
          {' '}
          { email_address }
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
                  {shipping?.first_name ?? first_name}
                  {' '}
                  {shipping?.last_name ?? last_name}
                </div>
                <div className="Content__Details--Detail">
                  {shipping.address_line_1}
                  {' '}
                  {shipping.address_line_2}
                </div>
                <div className="Content__Details--Detail">
                  {shipping.city}
                  {' '}
                  {shipping.province_code}
                  {' '}
                  {shipping.postal_code}
                </div>
                <div className="Content__Details--Detail">{shipping.country}</div>
              </div>
            </div>
            <div className="OrderInformation__Details--Content">
              <div className="Content__Title">Shipping method</div>
              <div className="Content__Details--Detail">{applicationState?.shipping?.selected_shipping?.description}</div>
            </div>
          </div>
          <div className="OrderInformation__Details">
            <div className="OrderInformation__Details--Content">
              <div className="Content__Title">Billing address</div>
              <div className="Content__Details">
                <div className="Content__Details--Detail">
                  {billing?.first_name ?? first_name}
                  {' '}
                  {billing?.last_name ?? last_name}

                </div>
                <div className="Content__Details--Detail">
                  {billing.address_line_1}
                  {' '}
                  {billing.address_line_2}
                </div>
                <div className="Content__Details--Detail">
                  {billing.city}
                  {' '}
                  {billing.province_code}
                  {' '}
                  {billing.postal_code}
                </div>
                <div className="Content__Details--Detail">{ billing.country }</div>
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
};

export default OrderProcessed;
