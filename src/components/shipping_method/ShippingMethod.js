import React, {
  useEffect, useState, useCallback, useContext,
} from 'react';
import RadioField from '@boldcommerce/stacks-ui/lib/components/radiofield/RadioField';
import { Price } from '@boldcommerce/stacks-ui';
import useShippingLines from '../../hooks/useShippingLines';
import EmptyState from '../empty_state/EmptyState';
import './ShippingMethod.css';
import LoadingState from '../loading_state/LoadingState';
import CheckoutContext from '../Context';

const debounce = (callback, wait) => {
  let timeout = null;
  return (...args) => {
    const next = () => callback(...args);
    clearTimeout(timeout);
    timeout = setTimeout(next, wait);
  };
};

const ShippingMethod = () => {
  const {
    selectedShipping,
    shippingLines,
    setShippingLine,
    isLoading,
    isEmpty,
  } = useShippingLines();
  const {
    setShippingMethodRequest,
    shippingErrors,
    billingErrors,
  } = useContext(CheckoutContext);

  const [localIndex, setLocalIndex] = useState();

  useEffect(() => {
    if (selectedShipping && selectedShipping.id) {
      setLocalIndex(parseInt(selectedShipping.id));
    }
  }, [selectedShipping?.id]);

  const debouncedSubmit = useCallback(debounce((index) => {
    if (selectedShipping?.id && parseInt(selectedShipping.id) === index) return;
    // Set Shipping Line with index
    setShippingLine(index);
    setShippingMethodRequest(false);
  }, 1000), [setShippingLine]);

  if (isEmpty || !!shippingErrors || !!billingErrors) {
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
      {isLoading ? <LoadingState />
        : (
          <div className="FieldSet__Content">
            {shippingLines.map((method, index) => (
              <div className="RadioButton" key={index}>
                <RadioField
                  label={method.description}
                  name="shipping-method"
                  checked={localIndex === index}
                  className="RadioField"
                  onChange={() => {
                    setShippingMethodRequest(true);
                    setLocalIndex(index);
                    debouncedSubmit(index);
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

export default ShippingMethod;
