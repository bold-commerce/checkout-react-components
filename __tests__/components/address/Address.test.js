import React from 'react';
import { render } from '@testing-library/react';
import { Address } from '../../../src/components/address/Address';
import {
  addressErrors, caProvinces, countries, emptyAddress, exampleAddress,
} from '../../utils/addressHelpers';

describe('Address', () => {
  test('renders Address component', () => {
    const { asFragment } = render(
      <Address
        address={emptyAddress}
        onChange={null}
        errors={null}
        countries={countries}
        provinces={caProvinces}
        showPostalCode
        showProvince
        provinceLabel="Province"
        submit={null}
        requiredAddressFields={null}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders Address component with errors', () => {
    const { asFragment } = render(
      <Address
        address={emptyAddress}
        onChange={null}
        errors={addressErrors}
        countries={countries}
        provinces={caProvinces}
        showPostalCode
        showProvince
        provinceLabel="Province"
        submit={null}
        requiredAddressFields={null}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders Address component with pre-filled data', () => {
    const { asFragment } = render(
      <Address
        address={exampleAddress}
        onChange={null}
        errors={null}
        countries={countries}
        provinces={caProvinces}
        showPostalCode
        showProvince
        provinceLabel="Province"
        submit={null}
        requiredAddressFields={null}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders Address component with required fields', () => {
    const requiredFields = [
      'first_name',
      'last_name',
      'address_line_1',
      'address_line_2',
      'business_name',
      'phone_number',
    ];

    const { asFragment } = render(
      <Address
        address={exampleAddress}
        onChange={null}
        errors={null}
        countries={countries}
        provinces={caProvinces}
        showPostalCode
        showProvince
        provinceLabel="Province"
        submit={null}
        requiredAddressFields={requiredFields}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
