import React from 'react';
import { render } from '@testing-library/react';
import { Customer } from '../../../src/components/customer/Customer';

describe('Customer', () => {
  test('renders Customer component', () => {
    const { asFragment } = render(<Customer customer={null} customerErrors={null} isAuthenticated={false} submitCustomer={null} onChange={null} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders Customer component with errors', () => {
    const errors = {
      email: 'Email format is invalid.',
    };

    const { asFragment } = render(<Customer customer={null} customerErrors={errors} isAuthenticated={false} submitCustomer={null} onChange={null} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders authenticated Customer with pre-filled data', () => {
    const customer = {
      email_address: 'john.doe@email.com',
    };

    const { asFragment } = render(<Customer customer={customer} customerErrors={null} isAuthenticated submitCustomer={null} onChange={null} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
