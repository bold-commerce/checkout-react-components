import React from 'react';
import Address from '../address/Address';
import useAddress from '../../hooks/useAddress';
import './Shipping.css';

const ShippingAddress = () => {
  const {
    address, setAddress, errors, countries, provinces, handleSubmit, countryData,
  } = useAddress('Shipping');
  const {
    first_name, last_name, address_line_1, address_line_2, country_code, province_code, postal_code, business_name, phone_number, city,
  } = address;

  return (
    <section className="FieldSet FieldSet--ShippingAddress">
      <div className="FieldSet__Header">
        <div className="FieldSet__Heading">Shipping address</div>
      </div>
      <div className="FieldSet__Content">
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
      </div>
    </section>
  );
};

export default ShippingAddress;
