/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import RadioField from '@boldcommerce/stacks-ui/lib/components/radiofield/RadioField';
import Address from '../address/Address';
import './BillingAddress.css';

const BillingAddress = ({
  address,
  sameAsShipping,
  setSameAsShipping,
  dispatch,
  errors,
  countries,
  provinces,
  showPostalCode,
  showProvince,
  provinceLabel,
  submit,
}) => (
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
            address={address}
            dispatch={dispatch}
            errors={errors}
            countries={countries}
            provinces={provinces}
            showPostalCode={showPostalCode}
            showProvince={showProvince}
            provinceLabel={provinceLabel}
            submit={submit}
          />
        )}
    </div>
  </section>
);

BillingAddress.propTypes = {
  address: PropTypes.any,
  sameAsShipping: PropTypes.bool,
  setSameAsShipping: PropTypes.func,
  dispatch: PropTypes.func,
  errors: PropTypes.any,
  countries: PropTypes.any,
  provinces: PropTypes.any,
  showPostalCode: PropTypes.bool,
  showProvince: PropTypes.bool,
  provinceLabel: PropTypes.string,
  submit: PropTypes.func,
};

export default BillingAddress;
