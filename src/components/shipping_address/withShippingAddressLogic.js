import React, { useCallback, useReducer } from 'react';
import { debounce } from '../../helpers/debounce';
import useShippingAddress from '../../hooks/useShippingAddress';
import addressReducer from '../../reducers/addressReducer';

const withShippingAddressLogic = (Component) => {
  const WithShippingAddressLogic = (props) => {
    const {
      shippingAddress, shippingAddressErrors, shippingAddressCountries, submitShippingAddress,
    } = useShippingAddress();

    const [address, dispatch] = useReducer(addressReducer, shippingAddress);
    let provinces = [];
    let showPostalCode = false;
    let showProvince = false;
    let provinceLabel = 'Province';

    if (address.country_code) {
      const countryData = shippingAddressCountries.find((countryItem) => countryItem.iso_code === address.country_code);
      // eslint-disable-next-line no-nested-ternary
      provinces = countryData.provinces.sort((a, b) => ((a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)));
      showPostalCode = countryData.show_postal_code;
      showProvince = countryData.show_province;
      provinceLabel = countryData.province_label;
    }

    const debouncedSubmit = useCallback(debounce((data) => {
      submitShippingAddress(data);
    }, 1000), [submitShippingAddress]);

    const submit = useCallback(() => {
      debouncedSubmit(address);
    }, [debouncedSubmit, JSON.stringify(address)]);

    const updatedProps = {
      ...props,
      address,
      dispatch,
      errors: shippingAddressErrors,
      countries: shippingAddressCountries,
      provinces,
      showPostalCode,
      showProvince,
      provinceLabel,
      submit,
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...updatedProps} />;
  };

  return WithShippingAddressLogic;
};

export default withShippingAddressLogic;
