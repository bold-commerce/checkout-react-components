/* eslint-disable react/forbid-prop-types */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { InputField, SelectField } from '@bold-commerce/stacks-ui';
import './Address.css';

const debounce = (callback, wait) => {
  let timeout = null;
  return (...args) => {
    const next = () => callback(...args);
    clearTimeout(timeout);
    timeout = setTimeout(next, wait);
  };
};

const Address = ({
  firstName,
  lastName,
  company,
  address, address2,
  city,
  phone,
  country,
  province,
  postalCode,
  countries, provinces,
  handleSubmit, setAddress,
  errors,
  countryData,
}) => {
  const countryList = countries.map((countryItem) => <option value={countryItem.iso_code} key={countryItem.iso_code}>{countryItem.name}</option>);
  const sortedProvinceList = provinces.sort((a, b) => ((a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)));
  const provinceList = sortedProvinceList.map((provinceItem) => <option value={provinceItem.iso_code} key={provinceItem.iso_code}>{provinceItem.name}</option>);
  const showProvince = countryData[country]?.show_province ?? false;
  const showPostalCode = countryData[country]?.show_postal_code ?? false;
  let provinceLabel = countryData[country]?.province_label ?? 'Province';
  provinceLabel = provinceLabel.replace('_', ' ');

  const debouncedSubmit = useCallback(debounce(() => {
    // If country, province, and postal code if applicable, are filled, then validate
    // else If e.target == country, province, or postal code and e.target.value is empty, then validate
    if (country && (showProvince && province) && (showPostalCode && postalCode)) {
      // handleSubmit();
    }
    // else if (e.target == ) {

    // }

    handleSubmit();
  }, 1000), [handleSubmit, province, showProvince, showPostalCode, postalCode, country]);

  return (
    <div className="FieldSet--Address">
      <div className="FieldGroup">
        <InputField
          placeholder="First name"
          type="text"
          name="first_name"
          className="Field Field--FirstName"
          value={firstName ?? ''}
          messageType={errors && errors?.first_name && 'alert' || ''}
          messageText={errors && errors?.first_name && 'Enter a first name' || ''}
          onChange={
            (e) => setAddress({
              first_name: e.target.value,
            })
          }
          onBlur={
            debouncedSubmit
          }
        />
        <InputField
          placeholder="Last name"
          type="text"
          name="last_name"
          className="Field Field--LastName"
          value={lastName ?? ''}
          messageType={errors && errors?.last_name && 'alert' || ''}
          messageText={errors && errors?.last_name && 'Enter a last name' || ''}
          onChange={
            (e) => setAddress({
              last_name: e.target.value,
            })
          }
          onBlur={
            debouncedSubmit
          }
        />
      </div>
      <div className="FieldGroup">
        <InputField
          placeholder="Company (optional)"
          type="text"
          name="company"
          className="Field Field--Company"
          value={company ?? ''}
          onChange={
            (e) => setAddress({
              business_name: e.target.value,
            })
          }
          onBlur={
            debouncedSubmit
          }
        />
      </div>
      <div className="FieldGroup">
        <InputField
          placeholder="Address"
          type="text"
          name="address"
          className="Field Field--Address"
          value={address}
          messageType={errors && errors?.address && 'alert' || ''}
          messageText={errors && errors?.address && 'Enter an address' || ''}
          onChange={
            (e) => setAddress({
              address_line_1: e.target.value,
            })
          }
          onBlur={
            debouncedSubmit
          }
        />
        <InputField
          placeholder="Apt, suite, etc."
          type="text"
          name="address2"
          className="Field Field--Address2"
          value={address2}
          onChange={
            (e) => setAddress({
              address_line_2: e.target.value,
            })
          }
          onBlur={
            debouncedSubmit
          }
        />
      </div>
      <div className="FieldGroup">
        <InputField
          placeholder="City"
          type="text"
          name="city"
          value={city ?? ''}
          messageType={errors && errors?.city && 'alert' || ''}
          messageText={errors && errors?.city && 'Enter a city' || ''}
          className="Field Field--City"
          onChange={
            (e) => setAddress({
              city: e.target.value,
            })
          }
          onBlur={
            debouncedSubmit
          }
        />
      </div>
      <div className="FieldGroup">
        <SelectField
          placeholder="Select a country"
          className="SelectField Field--Country"
          value={country}
          messageType={errors && errors?.country && 'alert' || ''}
          messageText={errors && errors?.country && 'Select a country' || ''}
          onChange={
            (e) => {
              setAddress({
                country_code: e.target.value,
              });
            }
          }
          onBlur={
            debouncedSubmit
          }
        >
          {countryList}
        </SelectField>
        {
          country
            && showProvince && (
            <SelectField
              placeholder={
                `Select a ${provinceLabel}`
              }
              className="SelectField Field--Province"
              value={province}
              messageType={errors && errors?.province && 'alert' || ''}
              messageText={errors && errors?.province && 'Select a province or state' || ''}
              onChange={
                (e) => setAddress({
                  province_code: e.target.value,
                })
              }
              onBlur={
                debouncedSubmit
              }
            >
              {provinceList}
            </SelectField>
          )
        }
        {country
          && showPostalCode && (
          <InputField
            placeholder="Postal code / ZIP"
            type="text"
            name="postal"
            className="Field Field--Postal_Code"
            messageType={errors && errors?.postal_code && 'alert' || ''}
            messageText={errors && errors?.postal_code && errors?.postal_code_error_message || ''}
            value={
              postalCode ?? ''
            }
            onChange={
              (e) => setAddress({
                postal_code: e.target.value,
              })
            }
            onBlur={
              debouncedSubmit
            }
          />
        )}
      </div>
      <div className="FieldGroup">
        <InputField
          placeholder="Phone (optional)"
          type="tel"
          name="phone"
          className="Field Field--Phone"
          value={phone ?? ''}
          onChange={
            (e) => setAddress({
              phone_number: e.target.value,
            })
          }
          onBlur={
            debouncedSubmit
          }

        />
      </div>
    </div>
  );
};

Address.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  company: PropTypes.string,
  address: PropTypes.string,
  address2: PropTypes.string,
  city: PropTypes.string,
  phone: PropTypes.string,
  country: PropTypes.string,
  province: PropTypes.string,
  postalCode: PropTypes.string,
  countries: PropTypes.array,
  provinces: PropTypes.array,
  handleSubmit: PropTypes.func,
  setAddress: PropTypes.func,
  errors: PropTypes.any,
  countryData: PropTypes.any,
};

export default Address;
