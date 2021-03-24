import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { debounce } from '../../helpers/debounce';
import useLineItems from '../../hooks/useLineItems';
import useShippingAddress from '../../hooks/useShippingAddress';
import useShippingLines from '../../hooks/useShippingLines';
import CheckoutContext from '../Context';

const withShippingMethodLogic = (Component) => {
  const WithShippingMethodLogic = (props) => {
    const {
      selectedShipping,
      shippingLines,
      setShippingLine,
      getShippingLines,
      loadingShippingLines,
      emptyShippingLines,
    } = useShippingLines();

    const {
      shippingAddress,
    } = useShippingAddress();

    const {
      lineItems,
    } = useLineItems();

    const {
      setShippingMethodRequest,
      shippingErrors,
      billingErrors,
    } = useContext(CheckoutContext);

    const lineItemQuantities = lineItems.map((lineItem) => lineItem.product_data.quantity);
    const [index, setIndex] = useState(parseInt(selectedShipping?.id, 10));

    useEffect(() => {
      if (shippingAddress.country_code) {
        getShippingLines();
      }
    }, [getShippingLines, shippingAddress.country_code, shippingAddress.province_code, shippingAddress.postal_code, JSON.stringify(lineItemQuantities), shippingErrors, billingErrors]);

    useEffect(() => {
      if (selectedShipping && selectedShipping.id) {
        setIndex(parseInt(selectedShipping.id, 10));
      }
    }, [selectedShipping?.id]);

    const debouncedSubmit = useCallback(debounce((i) => {
      if (selectedShipping?.id && parseInt(selectedShipping.id, 10) === i) return;
      setShippingLine(i);
      setShippingMethodRequest(false);
    }, 1000), [setShippingLine]);

    const setSelectedShippingLineIndex = useCallback((i) => {
      setIndex(i);
      debouncedSubmit(i);
    }, [debouncedSubmit]);

    const updatedProps = {
      ...props,
      selectedShipping,
      shippingLines,
      loadingShippingLines,
      emptyShippingLines,
      selectedShippingLineIndex: index,
      setSelectedShippingLineIndex,
      shippingErrors,
      billingErrors,
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...updatedProps} />;
  };

  return WithShippingMethodLogic;
};

export default withShippingMethodLogic;
