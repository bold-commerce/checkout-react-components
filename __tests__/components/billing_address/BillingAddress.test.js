import React from 'react';
import { render } from '@testing-library/react';
import { BillingAddress } from '../../../src/components/billing_address/BillingAddress';
import {
  addressErrors, countries, emptyAddress, exampleAddress,
} from '../../utils/addressHelpers';

describe('BillingAddress', () => {
  test('renders BillingAddress component', () => {
    const { asFragment } = render(
      <BillingAddress
        billingAddress={emptyAddress}
        countryInfo={countries}
        billingAddressErrors={null}
        billingSameAsShipping={false}
        submitBillingAddress={null}
        setBillingSameAsShipping={null}
        onChange={null}
        requiredAddressFields={null}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders BillingAddress component with errors', () => {
    const { asFragment } = render(
      <BillingAddress
        billingAddress={emptyAddress}
        countryInfo={countries}
        billingAddressErrors={addressErrors}
        billingSameAsShipping={false}
        submitBillingAddress={null}
        setBillingSameAsShipping={null}
        onChange={null}
        requiredAddressFields={null}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders BillingAddress component with pre-filled data', () => {
    const { asFragment } = render(
      <BillingAddress
        billingAddress={exampleAddress}
        countryInfo={countries}
        billingAddressErrors={null}
        billingSameAsShipping={false}
        submitBillingAddress={null}
        setBillingSameAsShipping={null}
        onChange={null}
        requiredAddressFields={null}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders BillingAddress component with same as shipping selected', () => {
    const { asFragment } = render(
      <BillingAddress
        billingAddress={null}
        countryInfo={countries}
        billingAddressErrors={null}
        billingSameAsShipping
        submitBillingAddress={null}
        setBillingSameAsShipping={null}
        onChange={null}
        requiredAddressFields={null}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders BillingAddress component with required fields', () => {
    const requiredFields = [
      'first_name',
      'last_name',
      'address_line_1',
      'address_line_2',
      'business_name',
      'phone_number',
    ];

    const { asFragment } = render(
      <BillingAddress
        billingAddress={null}
        countryInfo={countries}
        billingAddressErrors={null}
        billingSameAsShipping
        submitBillingAddress={null}
        setBillingSameAsShipping={null}
        onChange={null}
        requiredAddressFields={requiredFields}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
