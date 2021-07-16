import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RadioField } from '@boldcommerce/stacks-ui';
import { useCountryInfo, useShippingAddress, useCheckoutStore } from '../../hooks';
import Address from '../address/Address'
import './LoggedInShippingAddress.css';

const AddressData = ({ addressInfo }) => {

    return (
        <div className="CheckoutStep__FieldSetInfoContainer">
            <span className="CheckoutStep__FieldSetInfo">{addressInfo.first_name} {addressInfo.last_name}</span>
            <span className="CheckoutStep__FieldSetInfo">{addressInfo.address_line_1}</span>
            <span className="CheckoutStep__FieldSetInfo">{addressInfo.address_line_2}</span>
            <span className="CheckoutStep__FieldSetInfo">{addressInfo.city}, {addressInfo.province_code}, {addressInfo.postal_code}</span>
            <span className="CheckoutStep__FieldSetInfo">{addressInfo.country}</span>
            <span className="CheckoutStep__FieldSetInfo">{addressInfo.phone_number}</span>
        </div>
    );
};

const LoggedInShippingAddress = ({
  shippingAddress,
  countryInfo,
  shippingAddressErrors,
  onChange,
  submitShippingAddress,
  shippingAddresses,
  disableShippingAddressComponent,
}) => {
  
  const [address,setAddress] = useState(shippingAddress);
  const {
    countries,
    provinces,
    showProvince,
    showPostalCode,
    provinceLabel,
  } = useCountryInfo(countryInfo, address);

  const updateShippingAddress = (selectedAddress) => {
    submitShippingAddress(selectedAddress);
    setAddress(selectedAddress);
  };
    
  return (
      <>
          <section className="FieldSet FieldSet--ShippingMethod">
          <div className="FieldSet__Header">
              <div className="FieldSet__Heading">Shipping address</div>
          </div>
              <>
                  <div className="FieldSet__Content">
                      {shippingAddresses && shippingAddresses.map((method, index) => (
                          <div className="RadioButton RadioButton__AddressInfoContainer" key={index}>
                              <RadioField
                                label={<AddressData addressInfo={method} />}
                                name="shipping-address"
                                checked={ address?.id === method?.id }
                                className="RadioField"
                                onChange={() => {
                                  updateShippingAddress(method)
                                }}
                                disabled={disableShippingAddressComponent}
                              />
                          </div>
                      ))}
                      <div className="RadioButton RadioButton__NewAddressContainer">
                          <RadioField
                            label="Add a new address"
                            name="shipping-address"
                            checked={ address?.id == null }
                            className="RadioField"
                            onChange={() => setAddress((prevAddress) => ({
                              ...prevAddress,
                              id: null,
                            }))}
                            disabled={disableShippingAddressComponent}
                          />
                      </div>
                      { address?.id == null && 
                          ( 
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
                          ) 
                      }
                  </div>
              </>
          </section>
      </>
    );
}


LoggedInShippingAddress.propTypes = {
  shippingAddress: PropTypes.any,
  countryInfo: PropTypes.array,
  shippingAddressErrors: PropTypes.object,
  submitShippingAddress: PropTypes.func,
  onChange: PropTypes.func,
  shippingAddresses: PropTypes.array,
};

const MemoizedLoggedInShippingAddress = React.memo(LoggedInShippingAddress);

const LoggedInShippingAddressContainer = ({ onChange }) => {
  const {
    shippingAddress, countryInfo, shippingAddressErrors, submitShippingAddress, savedAddresses, 
  } = useShippingAddress();
  const { state } = useCheckoutStore();
  const disableShippingAddressComponent = state.loadingStatus.isLoading;

  return (
    <MemoizedLoggedInShippingAddress
      shippingAddress={shippingAddress}
      countryInfo={countryInfo}
      shippingAddressErrors={shippingAddressErrors}
      onChange={onChange}
      submitShippingAddress={onChange || submitShippingAddress}
      shippingAddresses={savedAddresses}
      disableShippingAddressComponent={disableShippingAddressComponent}
    />
  );
};

LoggedInShippingAddressContainer.propTypes = {
  onChange: PropTypes.func,
};

export default LoggedInShippingAddressContainer;