/* eslint-disable react/forbid-prop-types */
import React, { useCallback } from 'react';
import ShippingAddress from '../shipping_address/ShippingAddress';
import useShippingAddress from '../../hooks/useShippingAddress';

const OneClickShippingAddressWrapper = () => {
    const { submitShippingAddress } = useShippingAddress();

    const trySubmitAddress =  useCallback( (localStateAddress) => {
        if (localStateAddress && localStateAddress.country_code && localStateAddress.province_code) {
            submitShippingAddress(localStateAddress);
        }
    },[submitShippingAddress]);

    return <ShippingAddress />
};

export default OneClickShippingAddressWrapper;