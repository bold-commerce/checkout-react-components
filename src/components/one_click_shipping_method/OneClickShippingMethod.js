/* eslint-disable react/forbid-prop-types */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RadioField from '@boldcommerce/stacks-ui/lib/components/radiofield/RadioField';
import { Price, Button } from '@boldcommerce/stacks-ui';
import EmptyState from '../empty_state/EmptyState';
import LoadingState from '../loading_state/LoadingState';
import './OneClickShippingMethod.css';
import CheckoutContext from '../Context';
import useBillingAddress from '../../hooks/useBillingAddress';
import useShippingLines from '../../hooks/useShippingLines';

const OneClickShippingMethod = ({
  shippingLines,
  fetchingShippingLines,
  emptyShippingLines,
  selectedShippingLineIndex,
  setSelectedShippingLineIndex,
  shippingErrors,
  billingErrors,
  onIncrementStep,
  nextButtonText
}) => {
    const { isLoading } = useContext(CheckoutContext);
    // TODO: remove these hooks
    const { submitBillingAddress } = useBillingAddress();
    const { getShippingLines } = useShippingLines();
    
    const tryStepIncrement = () => {
        if (!emptyShippingLines && !shippingErrors && !billingErrors && selectedShippingLineIndex >= 0 ) {
            onIncrementStep();
        }
    }

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
    <>
        <section className="FieldSet FieldSet--ShippingMethod">
        <div className="FieldSet__Header">
            <div className="FieldSet__Heading">Shipping method</div>
        </div>
        {fetchingShippingLines ? <LoadingState />
            : (
            <>
            <div className="FieldSet__Content">
                {shippingLines && shippingLines.map((method, index) => (
                <div className="RadioButton" key={index}>
                    <RadioField
                    label={method.description}
                    name="shipping-method"
                    checked={selectedShippingLineIndex === index}
                    className="RadioField"
                    onChange={() => {
                      setSelectedShippingLineIndex(index)
                    }}
                    disabled={fetchingShippingLines || isLoading}
                    />
                    <Price className="ShippingMethod__Price" amount={method.amount} />
                </div>
                ))}
            </div>
            </>
            )}
        </section>
        <Button onClick={() => submitBillingAddress({"first_name":"Jonathan","last_name":"Redfern","address_line_1":"616 Queenston St","address_line_2":"","city":"Winnipeg","country":"Canada","province":"Manitoba","country_code":"CA","province_code":"MB","postal_code":"R3N0X5","business_name":"Bold Innovation Group","phone_number":"2048675309","id":23077})}>Click me</Button>
        <Button onClick={() => getShippingLines()}>Click me too</Button>
        { nextButtonText ? (
            <Button className="CheckoutStep__NextBtn" onClick={() => tryStepIncrement()} disabled={ selectedShippingLineIndex == NaN  || fetchingShippingLines || isLoading } loading={fetchingShippingLines || isLoading } >{nextButtonText}</Button>
          )
          : null
        }
    </>
  );
};

OneClickShippingMethod.propTypes = {
  shippingLines: PropTypes.any,
  fetchingShippingLines: PropTypes.bool,
  emptyShippingLines: PropTypes.bool,
  selectedShippingLineIndex: PropTypes.number,
  setSelectedShippingLineIndex: PropTypes.func,
  shippingErrors: PropTypes.any,
  billingErrors: PropTypes.any,
};

export default OneClickShippingMethod;