/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useCountryInfo from '../../hooks/useCountryInfo';
import Address from '../address/Address';
import useShippingAddress from '../../hooks/useShippingAddress';
import './ShippingAddress.css';

const ShippingAddress = ({
  shippingAddress, countryInfo, shippingAddressErrors, submitShippingAddress, onChange, requiredAddressFields,
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
          requiredAddressFields={requiredAddressFields}
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
  requiredAddressFields: PropTypes.array,
};

const MemoizedShippingAddress = React.memo(ShippingAddress);

const ShippingAddressContainer = ({ onChange, requiredAddressFields }) => {
  const {
    shippingAddress, countryInfo, shippingAddressErrors, submitShippingAddress,
  } = useShippingAddress(requiredAddressFields);

  return (
    <MemoizedShippingAddress
      shippingAddress={shippingAddress}
      countryInfo={countryInfo}
      shippingAddressErrors={shippingAddressErrors}
      onChange={onChange}
      submitShippingAddress={onChange || submitShippingAddress}
      requiredAddressFields={requiredAddressFields}
    />
  );
};

ShippingAddressContainer.propTypes = {
  onChange: PropTypes.func,
  requiredAddressFields: PropTypes.array,
};

export default ShippingAddressContainer;