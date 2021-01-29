import React, { useState, useContext, useEffect } from 'react';
import RadioField from '@bold-commerce/stacks-ui/lib/components/radiofield/RadioField';
import Address from '../address/Address';
import useAddress from '../../hooks/useAddress';
import CheckoutContext from '../Context';
import './Billing.css';

const Billing = () => {
  const {
    address, setAddress, errors, countries, provinces, handleSubmit, countryData,
  } = useAddress('Billing');
  const {
    first_name, last_name, address_line_1, address_line_2, city, country_code, province_code, postal_code, business_name, phone_number,
  } = address;

  const {
    sameAsShipping, setSameAsShipping, applicationState,
  } = useContext(CheckoutContext);

  useEffect(() => {
    if (sameAsShipping) {
      handleSubmit();
    }
  }, [sameAsShipping, JSON.stringify(applicationState.addresses.shipping)]);

  return (
    <section className="FieldSet FieldSet--BillingAddress">
      <div className="FieldSet__Header">
        <div className="FieldSet__Heading">Billing address</div>
      </div>
      <div className="FieldSet__Content">
        <RadioField
          label="Same as shipping address"
          name="billing-address"
          className="RadioButton"
          value="SAME_AS_SHIPPING_ADDRESS"
          checked={sameAsShipping}
          onChange={() => {
            setSameAsShipping(true);
          }}
        />
        <RadioField
          label="Use a different billing address"
          name="billing-address"
          className="RadioButton"
          value="DIFFERENT_BILLING_ADDRESS"
          checked={!sameAsShipping}
          onChange={() => setSameAsShipping(false)}
        />
        { sameAsShipping ? null
          : (
            <Address
              firstName={first_name}
              lastName={last_name}
              company={business_name}
              address={address_line_1}
              address2={address_line_2}
              city={city}
              phone={phone_number}
              country={country_code}
              province={province_code}
              postalCode={postal_code}
              countries={countries}
              provinces={provinces}
              setAddress={setAddress}
              handleSubmit={handleSubmit}
              errors={errors}
              countryData={countryData}
            />
          )}
      </div>
    </section>
  );
};

export default Billing;
