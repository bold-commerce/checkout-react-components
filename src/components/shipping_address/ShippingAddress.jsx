/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useCountryInfo from '../../hooks/useCountryInfo';
import Address from '../address/Address';
import useShippingAddress from '../../hooks/useShippingAddress';
import './ShippingAddress.css';

const ShippingAddress = ({
  shippingAddress, countryInfo, shippingAddressErrors, submitShippingAddress, onChange,
}) => {
  const [address, setAddress] = useState(shippingAddress);
  const {
    countries,
    provinces,
    showProvince,
    showPostalCode,
    provinceLabel,
  } = useCountryInfo(countryInfo, address);

  useEffect(() => {
    if (onChange) {
      onChange(address);
    }
  }, [address]);

  return (
    <section className="FieldSet FieldSet--ShippingAddress">
      <div className="FieldSet__Header">
        <div className="FieldSet__Heading">Shipping address</div>
      </div>
      <div className="FieldSet__Content">
        <Address
          address={address}
          onChange={(data) => setAddress((prevAddress) => ({
            ...prevAddress,
            ...data,
          }))}
          errors={shippingAddressErrors}
          countries={countries}
          provinces={provinces}
          showPostalCode={showPostalCode}
          showProvince={showProvince}
          provinceLabel={provinceLabel}
          submit={() => submitShippingAddress(address)}
        />
      </div>
    </section>
  );
};

ShippingAddress.propTypes = {
  shippingAddress: PropTypes.any,
  countryInfo: PropTypes.array,
  shippingAddressErrors: PropTypes.object,
  submitShippingAddress: PropTypes.func,
  onChange: PropTypes.func,
};

const MemoizedShippingAddress = React.memo(ShippingAddress);

const ShippingAddressContainer = ({ onChange }) => {
  const {
    shippingAddress, countryInfo, shippingAddressErrors, submitShippingAddress,
  } = useShippingAddress();

  return (
    <MemoizedShippingAddress
      shippingAddress={shippingAddress}
      countryInfo={countryInfo}
      shippingAddressErrors={shippingAddressErrors}
      onChange={onChange}
      submitShippingAddress={onChange || submitShippingAddress}
    />
  );
};

ShippingAddressContainer.propTypes = {
  onChange: PropTypes.func,
};

export default ShippingAddressContainer;