import React, {
  useCallback, useEffect, useReducer, useState,
} from 'react';
import { debounce } from '../../helpers/debounce';
import useBillingAddress from '../../hooks/useBillingAddress';
import useShippingAddress from '../../hooks/useShippingAddress';
import addressReducer from '../../reducers/addressReducer';

const withBillingAddressLogic = (Component) => {
  const WithBillingAddressLogic = (props) => {
    const {
      billingAddress, billingAddressErrors, billingAddressCountries, submitBillingAddress,
    } = useBillingAddress();

    const { shippingAddress } = useShippingAddress();

    const [sameAsShipping, setSameAsShipping] = useState(true);

    useEffect(() => {
      if (sameAsShipping) {
        submitBillingAddress(shippingAddress);
      }
    }, [sameAsShipping, JSON.stringify(shippingAddress)]);

    const [address, dispatch] = useReducer(addressReducer, billingAddress);
    let provinces = [];
    let showPostalCode = false;
    let showProvince = false;
    let provinceLabel = 'Province';

    if (address.country_code) {
      const countryData = billingAddressCountries.find((countryItem) => countryItem.iso_code === address.country_code);
      // eslint-disable-next-line no-nested-ternary
      provinces = countryData.provinces.sort((a, b) => ((a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)));
      showPostalCode = countryData.show_postal_code;
      showProvince = countryData.show_province;
      provinceLabel = countryData.province_label;
    }

    const debouncedSubmit = useCallback(debounce((data) => {
      submitBillingAddress(data);
    }, 1000), [submitBillingAddress]);

    const submit = useCallback(() => {
      debouncedSubmit(address);
    }, [debouncedSubmit, JSON.stringify(address)]);

    const updatedProps = {
      ...props,
      address,
      sameAsShipping,
      setSameAsShipping,
      dispatch,
      errors: billingAddressErrors,
      countries: billingAddressCountries,
      provinces,
      showPostalCode,
      showProvince,
      provinceLabel,
      submit,
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...updatedProps} />;
  };

  return WithBillingAddressLogic;
};

export default withBillingAddressLogic;
