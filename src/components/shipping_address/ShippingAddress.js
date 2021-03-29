/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Address from '../address/Address';
import './ShippingAddress.css';

const ShippingAddress = ({
  address,
  dispatch,
  errors,
  countries,
  provinces,
  showPostalCode,
  showProvince,
  provinceLabel,
  submit,
}) => (
  <section className="FieldSet FieldSet--ShippingAddress">
    <div className="FieldSet__Header">
      <div className="FieldSet__Heading">Shipping address</div>
    </div>
    <div className="FieldSet__Content">
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
    </div>
  </section>
);

ShippingAddress.propTypes = {
  address: PropTypes.any,
  dispatch: PropTypes.func,
  errors: PropTypes.any,
  countries: PropTypes.any,
  provinces: PropTypes.any,
  showPostalCode: PropTypes.bool,
  showProvince: PropTypes.bool,
  provinceLabel: PropTypes.string,
  submit: PropTypes.func,
};

export default ShippingAddress;
