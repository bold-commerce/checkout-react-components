/* eslint-disable no-mixed-operators */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { InputField, SelectField } from '@boldcommerce/stacks-ui';
import './Address.css';

const Address = ({
  address,
  dispatch,
  errors,
  countries,
  provinces,
  showPostalCode,
  showProvince,
  provinceLabel,
  submit,
}) => {
  const countryList = countries.map((countryItem) => <option value={countryItem.iso_code} key={countryItem.iso_code}>{countryItem.name}</option>);
  const provinceList = provinces.map((provinceItem) => <option value={provinceItem.iso_code} key={provinceItem.iso_code}>{provinceItem.name}</option>);

  return (
    <div className="FieldSet--Address">
      <div className="FieldGroup">
        <InputField
          placeholder="First name"
          type="text"
          name="first_name"
          className="Field Field--FirstName"
          value={address.first_name}
          messageType={errors && errors?.first_name && 'alert' || ''}
          messageText={errors && errors?.first_name && 'Enter a first name' || ''}
          onChange={(e) => dispatch({
            type: 'first_name',
            payload: e.target.value,
          })}
          onBlur={submit}
        />
        <InputField
          placeholder="Last name"
          type="text"
          name="last_name"
          className="Field Field--LastName"
          value={address.last_name}
          messageType={errors && errors?.last_name && 'alert' || ''}
          messageText={errors && errors?.last_name && 'Enter a last name' || ''}
          onChange={(e) => dispatch({
            type: 'last_name',
            payload: e.target.value,
          })}
          onBlur={submit}
        />
      </div>
      <div className="FieldGroup">
        <InputField
          placeholder="Company (optional)"
          type="text"
          name="company"
          className="Field Field--Company"
          value={address.business_name}
          onChange={(e) => dispatch({
            type: 'business_name',
            payload: e.target.value,
          })}
          onBlur={submit}
        />
      </div>
      <div className="FieldGroup">
        <InputField
          placeholder="Address"
          type="text"
          name="address"
          className="Field Field--Address"
          value={address.address_line_1}
          messageType={errors && errors?.address && 'alert' || ''}
          messageText={errors && errors?.address && 'Enter an address' || ''}
          onChange={(e) => dispatch({
            type: 'address_line_1',
            payload: e.target.value,
          })}
          onBlur={submit}
        />
        <InputField
          placeholder="Apt, suite, etc."
          type="text"
          name="address2"
          className="Field Field--Address2"
          value={address.address_line_2}
          onChange={(e) => dispatch({
            type: 'address_line_2',
            payload: e.target.value,
          })}
          onBlur={submit}
        />
      </div>
      <div className="FieldGroup">
        <InputField
          placeholder="City"
          type="text"
          name="city"
          value={address.city}
          messageType={errors && errors?.city && 'alert' || ''}
          messageText={errors && errors?.city && 'Enter a city' || ''}
          className="Field Field--City"
          onChange={(e) => dispatch({
            type: 'city',
            payload: e.target.value,
          })}
          onBlur={submit}
        />
      </div>
      <div className="FieldGroup">
        <SelectField
          placeholder="Select a country"
          className="SelectField Field--Country"
          value={address.country_code}
          messageType={errors && errors?.country && 'alert' || ''}
          messageText={errors && errors?.country && 'Select a country' || ''}
          onChange={(e) => dispatch({
            type: 'country_code',
            payload: e.target.value,
          })}
          onBlur={submit}
        >
          {countryList}
        </SelectField>
        {
          address.country_code
            && showProvince && (
            <SelectField
              placeholder={
                `Select a ${provinceLabel}`
              }
              className="SelectField Field--Province"
              value={address.province_code}
              messageType={errors && errors?.province && 'alert' || ''}
              messageText={errors && errors?.province && 'Select a province or state' || ''}
              onChange={(e) => dispatch({
                type: 'province_code',
                payload: e.target.value,
              })}
              onBlur={submit}
            >
              {provinceList}
            </SelectField>
          )
        }
        {address.country_code
          && showPostalCode && (
          <InputField
            placeholder="Postal code / ZIP"
            type="text"
            name="postal"
            className="Field Field--Postal_Code"
            messageType={errors && errors?.postal_code && 'alert' || ''}
            messageText={errors && errors?.postal_code && errors?.postal_code_error_message || ''}
            value={address.postal_code}
            onChange={(e) => dispatch({
              type: 'postal_code',
              payload: e.target.value,
            })}
            onBlur={submit}
          />
        )}
      </div>
      <div className="FieldGroup">
        <InputField
          placeholder="Phone (optional)"
          type="tel"
          name="phone"
          className="Field Field--Phone"
          value={address.phone}
          onChange={(e) => dispatch({
            type: 'phone',
            payload: e.target.value,
          })}
          onBlur={submit}
        />
      </div>
    </div>
  );
};

Address.propTypes = {
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

export default Address;
