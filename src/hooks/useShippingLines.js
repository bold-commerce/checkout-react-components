import { useCallback, useContext, useMemo } from 'react';
import { fetchShippingLines, setShippingLine } from '../api';
import { CheckoutStore } from '../store';

const useShippingLines = () => {
  const { state, dispatch } = useContext(CheckoutStore);

  const { csrf, apiPath, applicationState } = state;
  const shippingLines = applicationState.shipping.available_shipping_lines;
  const shippingAddressErrors = state.errors.shippingAddress;
  const selectedCountryCode = applicationState?.addresses?.shipping?.country_code;
  const shippingAddressLoadingStatus = state.loadingStatus.shippingAddress;
  const shippingLinesLoadingStatus = state.loadingStatus.shippingLines;
  const shippingLinesFetching = shippingLinesLoadingStatus === 'fetching' || shippingAddressLoadingStatus === 'setting';
  const showShippingLines = selectedCountryCode && !shippingAddressErrors && shippingAddressLoadingStatus !== 'incomplete';
  const selectedShippingLineIndex = parseInt(applicationState.shipping?.selected_shipping?.id ?? 0, 10);
  const memoizedShippingLines = useMemo(() => shippingLines, [JSON.stringify(shippingLines)]);

  const setSelectedShippingLine = useCallback(async (index) => {
    dispatch({
      type: 'checkout/shippingLine/setting',
    });

    const response = await setShippingLine(csrf, apiPath, index);
    if (response.data && response.data.application_state) {
      dispatch({
        type: 'checkout/shippingLine/set',
      });
      return dispatch({
        type: 'checkout/update',
        payload: response.data.application_state,
      });
    }

    return dispatch({
      type: 'checkout/shippingLine/set',
    });
  }, []);

  const getShippingLines = useCallback(async () => {
    // Don't get shipping lines if shipping address is not set
    if (!selectedCountryCode) {
      return Promise.resolve();
    }

    dispatch({
      type: 'checkout/shippingLines/fetching',
    });
    const response = await fetchShippingLines(csrf, apiPath);
    if (response.data && response.data.application_state) {
      dispatch({
        type: 'checkout/shippingLines/fetched',
      });
      return dispatch({
        type: 'checkout/update',
        payload: response.data.application_state,
      });
    }

    return dispatch({
      type: 'checkout/shippingLines/fetched',
    });
  }, [selectedCountryCode]);

  return {
    showShippingLines,
    shippingLinesFetching,
    shippingLinesLoadingStatus,
    shippingLines: memoizedShippingLines,
    selectedShippingLineIndex,
    setSelectedShippingLine,
    getShippingLines,
  };
};

export default useShippingLines;
