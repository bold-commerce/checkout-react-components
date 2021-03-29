/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import RadioField from '@boldcommerce/stacks-ui/lib/components/radiofield/RadioField';
import { Price } from '@boldcommerce/stacks-ui';
import EmptyState from '../empty_state/EmptyState';
import LoadingState from '../loading_state/LoadingState';
import './ShippingMethod.css';

const ShippingMethod = ({
  shippingLines,
  loadingShippingLines,
  emptyShippingLines,
  selectedShippingLineIndex,
  setSelectedShippingLineIndex,
  shippingErrors,
  billingErrors,
}) => {
  if (emptyShippingLines || !!shippingErrors || !!billingErrors) {
    return (
      <section className="FieldSet FieldSet--ShippingMethod">
        <div className="FieldSet__Header">
          <div className="FieldSet__Heading">Shipping method</div>
        </div>
        <div className="FieldSet__Content"><EmptyState title="To view shipping options, complete filling in your address" /></div>
      </section>
    );
  }

  return (
    <section className="FieldSet FieldSet--ShippingMethod">
      <div className="FieldSet__Header">
        <div className="FieldSet__Heading">Shipping method</div>
      </div>
      {loadingShippingLines ? <LoadingState />
        : (
          <div className="FieldSet__Content">
            {shippingLines && shippingLines.map((method, index) => (
              <div className="RadioButton" key={index}>
                <RadioField
                  label={method.description}
                  name="shipping-method"
                  checked={selectedShippingLineIndex === index}
                  className="RadioField"
                  onChange={() => {
                    setSelectedShippingLineIndex(index);
                  }}
                />
                <Price className="ShippingMethod__Price" amount={method.amount} />
              </div>
            ))}
          </div>
        )}
    </section>
  );
};

ShippingMethod.propTypes = {
  shippingLines: PropTypes.any,
  loadingShippingLines: PropTypes.bool,
  emptyShippingLines: PropTypes.bool,
  selectedShippingLineIndex: PropTypes.number,
  setSelectedShippingLineIndex: PropTypes.func,
  shippingErrors: PropTypes.any,
  billingErrors: PropTypes.any,
};

export default ShippingMethod;
