import React from 'react';
import { render } from '@testing-library/react';
import { ShippingAddress } from '../../../src/components/shipping_address/ShippingAddress';
import {
  addressErrors, countries, emptyAddress, exampleAddress, exampleSavedAddresses,
} from '../../utils/addressHelpers';

describe('ShippingAddress', () => {
  test('renders ShippingAddress component', () => {
    const { asFragment } = render(
      <ShippingAddress
        shippingAddress={emptyAddress}
        shippingAddresses={null}
        countryInfo={countries}
        shippingAddressErrors={null}
        submitShippingAddress={null}
        onChange={null}
        requiredAddressFields={null}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders ShippingAddress component with saved addresses', () => {
    const { asFragment } = render(
      <ShippingAddress
        shippingAddress={emptyAddress}
        shippingAddresses={exampleSavedAddresses}
        countryInfo={countries}
        shippingAddressErrors={null}
        submitShippingAddress={null}
        onChange={null}
        requiredAddressFields={null}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders ShippingAddress component with errors', () => {
    const { asFragment } = render(
      <ShippingAddress
        shippingAddress={emptyAddress}
        shippingAddresses={null}
        countryInfo={countries}
        shippingAddressErrors={addressErrors}
        submitShippingAddress={null}
        onChange={null}
        requiredAddressFields={null}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders ShippingAddress component with pre-filled data', () => {
    const { asFragment } = render(
      <ShippingAddress
        shippingAddress={exampleAddress}
        shippingAddresses={null}
        countryInfo={countries}
        shippingAddressErrors={null}
        submitShippingAddress={null}
        onChange={null}
        requiredAddressFields={null}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders ShippingAddress component with required fields', () => {
    const requiredFields = [
      'first_name',
      'last_name',
      'address_line_1',
      'address_line_2',
      'business_name',
      'phone_number',
    ];

    const { asFragment } = render(
      <ShippingAddress
        shippingAddress={exampleAddress}
        shippingAddresses={null}
        countryInfo={countries}
        shippingAddressErrors={null}
        submitShippingAddress={null}
        onChange={null}
        requiredAddressFields={requiredFields}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
