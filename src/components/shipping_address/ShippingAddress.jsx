/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { RadioField } from '@boldcommerce/stacks-ui';
import useCountryInfo from '../../hooks/useCountryInfo';
import Address from '../address/Address';
import { useLoadingStatus, useShippingAddress } from '../../hooks';
import './ShippingAddress.css';

const AddressData = ({ addressInfo }) => (
  <div className="CheckoutStep__FieldSetInfoContainer">
    <span className="CheckoutStep__FieldSetInfo">
      {addressInfo.first_name}
      {' '}
      {addressInfo.last_name}
    </span>
    <span className="CheckoutStep__FieldSetInfo">{addressInfo.address_line_1}</span>
    <span className="CheckoutStep__FieldSetInfo">{addressInfo.address_line_2}</span>
    <span className="CheckoutStep__FieldSetInfo">
      {addressInfo.city}
      ,
      {' '}
      {addressInfo.province_code}
      ,
      {' '}
      {addressInfo.postal_code}
    </span>
    <span className="CheckoutStep__FieldSetInfo">{addressInfo.country}</span>
    <span className="CheckoutStep__FieldSetInfo">{addressInfo.phone_number}</span>
  </div>
);

const ShippingAddress = ({
  shippingAddress, countryInfo, shippingAddressErrors, submitShippingAddress, onChange, requiredAddressFields, shippingAddresses, disable,
}) => {
  const [address, setAddress] = useState(shippingAddress);
  const {
    countries,
    provinces,
    showProvince,
    showPostalCode,
    provinceLabel,
  } = useCountryInfo(countryInfo, address);

  const updateSelectedShippingAddress = (selectedAddress) => {
    submitShippingAddress(selectedAddress);
    setAddress(selectedAddress);
  };

  useEffect(() => {
    if (onChange) {
      onChange(address);
    }
  }, [address]);

  return (
    <>
      <section className="FieldSet FieldSet--ShippingMethod">
        <div className="FieldSet__Header">
          <div className="FieldSet__Heading">Shipping address</div>
        </div>
        <>
          <div className="FieldSet__Content">
            {shippingAddresses.length > 0 && shippingAddresses.map((method, index) => (
              <div className="RadioButton RadioButton__AddressInfoContainer" key={index}>
                <RadioField
                  label={<AddressData addressInfo={method} />}
                  name="shipping-address"
                  checked={address?.id === method?.id}
                  className="RadioField"
                  onChange={() => {
                    updateSelectedShippingAddress(method);
                  }}
                  disabled={disable}
                />
              </div>
            ))}
            { shippingAddresses.length > 0 && (
              <div className="RadioButton RadioButton__NewAddressContainer">
                <RadioField
                  label="Add a new address"
                  name="shipping-address"
                  checked={address?.id === undefined}
                  className="RadioField"
                  onChange={() => setAddress((prevAddress) => ({
                    ...prevAddress,
                    id: undefined,
                  }))}
                  disabled={disable}
                />
              </div>
            )}
            { address?.id === undefined
                  && (
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
                  )}
          </div>
        </>
      </section>
    </>
  );
};

ShippingAddress.propTypes = {
  shippingAddress: PropTypes.any,
  countryInfo: PropTypes.array,
  shippingAddressErrors: PropTypes.object,
  submitShippingAddress: PropTypes.func,
  onChange: PropTypes.func,
  shippingAddresses: PropTypes.array,
  disable: PropTypes.bool,
  requiredAddressFields: PropTypes.array,
};

const MemoizedShippingAddress = React.memo(ShippingAddress);

const ShippingAddressContainer = ({ onChange, requiredAddressFields }) => {
  const {
    shippingAddress, countryInfo, shippingAddressErrors, submitShippingAddress, savedAddresses,
  } = useShippingAddress(requiredAddressFields);
  const { isLoading } = useLoadingStatus();

  return (
    <MemoizedShippingAddress
      shippingAddress={shippingAddress}
      countryInfo={countryInfo}
      shippingAddressErrors={shippingAddressErrors}
      onChange={onChange}
      submitShippingAddress={onChange || submitShippingAddress}
      shippingAddresses={savedAddresses}
      disable={isLoading}
      requiredAddressFields={requiredAddressFields}
    />
  );
};

ShippingAddressContainer.propTypes = {
  onChange: PropTypes.func,
  requiredAddressFields: PropTypes.array,
};

export default ShippingAddressContainer;
